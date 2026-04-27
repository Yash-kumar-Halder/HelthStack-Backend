import mongoose from 'mongoose';
import { ApiError } from '../../common/utils/api/api-error.js';

export class AdmissionService {
    constructor(
        admissionRepository,
        bedRepository,
        roomRepository,
        wardRepository,
        patientRepository,
        doctorRepository,
    ) {
        this.admissionRepository = admissionRepository;
        this.bedRepository = bedRepository;
        this.roomRepository = roomRepository;
        this.wardRepository = wardRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
    }

    async admit(body, registeredByUserId) {
        const ward = await this.wardRepository.findById(body.wardId);
        if (!ward) {
            throw ApiError.notFound('Ward not found');
        }

        const room = await this.roomRepository.findById(body.roomId);
        if (!room) {
            throw ApiError.notFound('Room not found');
        }
        if (String(room.wardId) !== String(body.wardId)) {
            throw ApiError.badRequest('Room does not belong to the given ward');
        }

        const patient = await this.patientRepository.findById(body.patientId);
        if (!patient) {
            throw ApiError.notFound('Patient not found');
        }

        const doctor = await this.doctorRepository.findById(body.doctorId);
        if (!doctor) {
            throw ApiError.notFound('Doctor not found');
        }

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const existingPatientAdmission =
                await this.admissionRepository.findActiveByPatientId(
                    body.patientId,
                    { session },
                );
            if (existingPatientAdmission) {
                throw ApiError.badRequest(
                    'Patient already has an active admission',
                );
            }

            const bedOccupied =
                await this.admissionRepository.findActiveByBedId(body.bedId, {
                    session,
                });
            if (bedOccupied) {
                throw ApiError.badRequest(
                    'Bed already has an active admission',
                );
            }

            const bedDoc = await this.bedRepository.findByIdForUpdate(
                body.bedId,
                session,
            );
            if (!bedDoc) {
                throw ApiError.notFound('Bed not found');
            }

            if (
                bedDoc.status !== 'AVAILABLE' ||
                Boolean(bedDoc.currentAdmissionId)
            ) {
                throw ApiError.badRequest('Bed is not available for admission');
            }
            if (String(bedDoc.wardId) !== String(body.wardId)) {
                throw ApiError.badRequest(
                    'Bed does not belong to the given ward',
                );
            }
            if (String(bedDoc.roomId) !== String(body.roomId)) {
                throw ApiError.badRequest(
                    'Bed does not belong to the given room',
                );
            }

            const admittedAt = body.admittedAt
                ? new Date(body.admittedAt)
                : new Date();

            const admissionPayload = {
                patientId: body.patientId,
                doctorId: body.doctorId,
                wardId: body.wardId,
                roomId: body.roomId,
                bedId: body.bedId,
                reason: body.reason?.trim() ?? '',
                notes: body.notes?.trim() ?? '',
                diagnosis: body.diagnosis?.trim() ?? '',
                medicalRecordSummary: body.medicalRecordSummary?.trim() ?? '',
                status: 'ACTIVE',
                admittedAt,
                dischargedAt: null,
                events: [
                    {
                        type: 'ADMITTED',
                        at: admittedAt,
                        meta: { registeredByUserId },
                    },
                ],
                registeredByUserId: registeredByUserId ?? null,
            };

            const admission = await this.admissionRepository.create(
                admissionPayload,
                { session },
            );

            bedDoc.status = 'OCCUPIED';
            bedDoc.currentAdmissionId = admission._id;
            await bedDoc.save({ session });

            await session.commitTransaction();
            return admission;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }

    async discharge(admissionId, dischargedByUserId) {
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const admissionDoc =
                await this.admissionRepository.findDocumentById(
                    admissionId,
                    session,
                );
            if (!admissionDoc) {
                throw ApiError.notFound('Admission not found');
            }

            if (admissionDoc.status !== 'ACTIVE') {
                throw ApiError.badRequest(
                    'Only active admissions can be discharged',
                );
            }

            const now = new Date();
            admissionDoc.status = 'DISCHARGED';
            admissionDoc.dischargedAt = now;
            admissionDoc.events.push({
                type: 'DISCHARGED',
                at: now,
                meta: { dischargedByUserId },
            });
            await admissionDoc.save({ session });

            const bedDoc = await this.bedRepository.findByIdForUpdate(
                admissionDoc.bedId,
                session,
            );
            if (!bedDoc) {
                throw ApiError.notFound('Bed linked to admission not found');
            }

            if (
                bedDoc.currentAdmissionId &&
                String(bedDoc.currentAdmissionId) !== String(admissionId)
            ) {
                throw ApiError.badRequest(
                    'Bed occupancy does not match this admission',
                );
            }

            bedDoc.status = 'AVAILABLE';
            bedDoc.currentAdmissionId = null;
            await bedDoc.save({ session });

            await session.commitTransaction();

            return admissionDoc.toObject
                ? admissionDoc.toObject()
                : admissionDoc;
        } catch (err) {
            await session.abortTransaction();
            throw err;
        } finally {
            session.endSession();
        }
    }

    async listByPatientId(patientId) {
        const patient = await this.patientRepository.findById(patientId);
        if (!patient) {
            throw ApiError.notFound('Patient not found');
        }

        return this.admissionRepository.findByPatientId(patientId);
    }

    async getById(id) {
        const admission = await this.admissionRepository.findById(id);
        if (!admission) {
            throw ApiError.notFound('Admission not found');
        }
        return admission;
    }
}
