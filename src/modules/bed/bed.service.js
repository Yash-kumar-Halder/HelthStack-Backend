import mongoose from 'mongoose';
import { ApiError } from '../../common/utils/api/api-error.js';

export class BedService {
    constructor(bedRepository, roomRepository, wardRepository) {
        this.bedRepository = bedRepository;
        this.roomRepository = roomRepository;
        this.wardRepository = wardRepository;
    }

    async _assertRoomBelongsToWard(wardId, roomId) {
        const room = await this.roomRepository.findById(roomId);
        if (!room) {
            throw ApiError.notFound('Room not found');
        }
        if (String(room.wardId) !== String(wardId)) {
            throw ApiError.badRequest('Room does not belong to the given ward');
        }
        return room;
    }

    async createBed(body) {
        await this._assertRoomBelongsToWard(body.wardId, body.roomId);

        const existing = await this.bedRepository.findOne({
            roomId: body.roomId,
            bedNumber: body.bedNumber.trim(),
        });
        if (existing) {
            throw ApiError.badRequest('Bed number already exists in this room');
        }

        return this.bedRepository.create({
            wardId: body.wardId,
            roomId: body.roomId,
            bedNumber: body.bedNumber.trim(),
            status: body.status ?? 'AVAILABLE',
            currentAdmissionId: null,
        });
    }

    listBeds(query) {
        const filter = {};
        if (query.wardId) {
            filter.wardId = query.wardId;
        }
        if (query.roomId) {
            filter.roomId = query.roomId;
        }
        if (query.status) {
            filter.status = query.status;
        }
        return this.bedRepository.findAll(filter);
    }

    async getAvailability(query) {
        const filter = {};
        if (query.wardId) {
            filter.wardId = query.wardId;
        }
        if (query.roomId) {
            filter.roomId = query.roomId;
        }

        const [countsAgg, beds] = await Promise.all([
            this.bedRepository.aggregateStatusCounts(filter),
            this.bedRepository.findAll(filter),
        ]);

        const counts = {
            AVAILABLE: 0,
            OCCUPIED: 0,
            MAINTENANCE: 0,
            total: beds.length,
        };
        for (const row of countsAgg) {
            if (row._id && counts[row._id] !== undefined) {
                counts[row._id] = row.count;
            }
        }

        return { counts, beds };
    }

    async getBedById(id) {
        const bed = await this.bedRepository.findById(id);
        if (!bed) {
            throw ApiError.notFound('Bed not found');
        }
        return bed;
    }

    async updateBed(id, body) {
        await this.getBedById(id);
        const update = {};
        if (body.bedNumber !== undefined) {
            update.bedNumber = body.bedNumber.trim();
        }
        if (body.status !== undefined) {
            update.status = body.status;
        }

        let wardId = body.wardId;
        let roomId = body.roomId;

        const current = await this.bedRepository.findById(id);
        if (wardId || roomId) {
            wardId = wardId ?? current.wardId;
            roomId = roomId ?? current.roomId;
            await this._assertRoomBelongsToWard(wardId, roomId);
            update.wardId = new mongoose.Types.ObjectId(wardId);
            update.roomId = new mongoose.Types.ObjectId(roomId);
        }

        if (update.bedNumber || update.roomId) {
            const roomForCheck = update.roomId ?? current.roomId;
            const bedNum = update.bedNumber ?? current.bedNumber;
            const clash = await this.bedRepository.findOne({
                roomId: roomForCheck,
                bedNumber: bedNum,
                _id: { $ne: id },
            });
            if (clash) {
                throw ApiError.badRequest(
                    'Bed number already exists in this room',
                );
            }
        }

        return this.bedRepository.updateById(id, { $set: update });
    }

    async deleteBed(id) {
        const bed = await this.getBedById(id);
        if (bed.status === 'OCCUPIED') {
            throw ApiError.badRequest(
                'Cannot delete bed while occupied; discharge patient first',
            );
        }
        return this.bedRepository.deleteById(id);
    }
}
