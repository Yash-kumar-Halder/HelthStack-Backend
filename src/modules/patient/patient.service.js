import { ApiError } from '../../common/utils/api/api-error.js';

export class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }

    async createPatient(body) {
        if (body.medicalRecordNumber) {
            const exists = await this.patientRepository.findOne({
                medicalRecordNumber: body.medicalRecordNumber.trim(),
            });
            if (exists) {
                throw ApiError.badRequest(
                    'Patient with this medical record number already exists',
                );
            }
        }

        return this.patientRepository.create({
            firstName: body.firstName.trim(),
            lastName: body.lastName.trim(),
            phone: body.phone?.trim() ?? '',
            dateOfBirth: body.dateOfBirth ?? null,
            gender: body.gender ?? 'UNKNOWN',
            address: body.address?.trim() ?? '',
            medicalRecordNumber: body.medicalRecordNumber?.trim() ?? undefined,
            linkedUserId: body.linkedUserId ?? null,
            status: body.status ?? 'ACTIVE',
        });
    }

    async getPatientById(id) {
        const patient = await this.patientRepository.findById(id);
        if (!patient) {
            throw ApiError.notFound('Patient not found');
        }
        return patient;
    }

    async updatePatient(id, body) {
        await this.getPatientById(id);
        const update = {};
        if (body.firstName !== undefined) {
            update.firstName = body.firstName.trim();
        }
        if (body.lastName !== undefined) {
            update.lastName = body.lastName.trim();
        }
        if (body.phone !== undefined) {
            update.phone = body.phone?.trim() ?? '';
        }
        if (body.dateOfBirth !== undefined) {
            update.dateOfBirth = body.dateOfBirth;
        }
        if (body.gender !== undefined) {
            update.gender = body.gender;
        }
        if (body.address !== undefined) {
            update.address = body.address?.trim() ?? '';
        }
        if (body.medicalRecordNumber !== undefined) {
            const mrn = body.medicalRecordNumber?.trim();
            if (mrn) {
                const clash = await this.patientRepository.findOne({
                    medicalRecordNumber: mrn,
                    _id: { $ne: id },
                });
                if (clash) {
                    throw ApiError.badRequest('Medical record number in use');
                }
                update.medicalRecordNumber = mrn;
            } else {
                update.medicalRecordNumber = undefined;
            }
        }
        if (body.status !== undefined) {
            update.status = body.status;
        }
        if (body.linkedUserId !== undefined) {
            update.linkedUserId = body.linkedUserId;
        }

        return this.patientRepository.updateById(id, { $set: update });
    }

    async deletePatient(id) {
        await this.getPatientById(id);
        return this.patientRepository.deleteById(id);
    }
}
