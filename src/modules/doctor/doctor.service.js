import { ApiError } from '../../common/utils/api/api-error.js';

export class DoctorService {
    constructor(doctorRepository) {
        this.doctorRepository = doctorRepository;
    }

    async createDoctor(body) {
        const exists = await this.doctorRepository.findOne({
            licenseId: body.licenseId.trim(),
        });
        if (exists) {
            throw ApiError.badRequest(
                'Doctor with this license id already exists',
            );
        }

        return this.doctorRepository.create({
            firstName: body.firstName.trim(),
            lastName: body.lastName.trim(),
            department: body.department.trim(),
            licenseId: body.licenseId.trim(),
            email: body.email?.trim().toLowerCase() ?? '',
            phone: body.phone?.trim() ?? '',
            status: body.status ?? 'ACTIVE',
        });
    }

    listDoctors(query = {}) {
        const filter = {};
        if (query.status) {
            filter.status = query.status;
        }
        if (query.department) {
            filter.department = new RegExp(
                query.department.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                'i',
            );
        }
        return this.doctorRepository.findAll(filter);
    }

    async getDoctorById(id) {
        const doctor = await this.doctorRepository.findById(id);
        if (!doctor) {
            throw ApiError.notFound('Doctor not found');
        }
        return doctor;
    }

    async updateDoctor(id, body) {
        await this.getDoctorById(id);
        const update = {};
        if (body.firstName !== undefined) {
            update.firstName = body.firstName.trim();
        }
        if (body.lastName !== undefined) {
            update.lastName = body.lastName.trim();
        }
        if (body.department !== undefined) {
            update.department = body.department.trim();
        }
        if (body.licenseId !== undefined) {
            const lid = body.licenseId.trim();
            const clash = await this.doctorRepository.findOne({
                licenseId: lid,
                _id: { $ne: id },
            });
            if (clash) {
                throw ApiError.badRequest('License id already in use');
            }
            update.licenseId = lid;
        }
        if (body.email !== undefined) {
            update.email = body.email?.trim().toLowerCase() ?? '';
        }
        if (body.phone !== undefined) {
            update.phone = body.phone?.trim() ?? '';
        }
        if (body.status !== undefined) {
            update.status = body.status;
        }

        return this.doctorRepository.updateById(id, { $set: update });
    }

    async deleteDoctor(id) {
        await this.getDoctorById(id);
        return this.doctorRepository.deleteById(id);
    }
}
