import { ApiError } from '../../common/utils/api/api-error.js';

export class WardService {
    constructor(wardRepository) {
        this.wardRepository = wardRepository;
    }

    async createWard(body) {
        const existing = await this.wardRepository.findOne({
            code: body.code.toUpperCase(),
        });
        if (existing) {
            throw ApiError.badRequest('Ward with this code already exists');
        }
        return this.wardRepository.create({
            name: body.name.trim(),
            code: body.code.trim().toUpperCase(),
            floor: body.floor ?? null,
            status: body.status ?? 'ACTIVE',
        });
    }

    listWards(query = {}) {
        const filter = {};
        if (query.status) {
            filter.status = query.status;
        }
        return this.wardRepository.findAll(filter);
    }

    async getWardById(id) {
        const ward = await this.wardRepository.findById(id);
        if (!ward) {
            throw ApiError.notFound('Ward not found');
        }
        return ward;
    }

    async updateWard(id, body) {
        await this.getWardById(id);
        const update = {};
        if (body.name !== undefined) {
            update.name = body.name.trim();
        }
        if (body.floor !== undefined) {
            update.floor = body.floor;
        }
        if (body.status !== undefined) {
            update.status = body.status;
        }
        if (body.code !== undefined) {
            const code = body.code.trim().toUpperCase();
            const clash = await this.wardRepository.findOne({
                code,
                _id: { $ne: id },
            });
            if (clash) {
                throw ApiError.badRequest('Ward code already in use');
            }
            update.code = code;
        }
        const updated = await this.wardRepository.updateById(id, {
            $set: update,
        });
        return updated;
    }

    async deleteWard(id) {
        await this.getWardById(id);
        return this.wardRepository.deleteById(id);
    }
}
