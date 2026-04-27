import { ApiError } from '../../common/utils/api/api-error.js';

export class RoomService {
    constructor(roomRepository, wardRepository) {
        this.roomRepository = roomRepository;
        this.wardRepository = wardRepository;
    }

    async createRoom(body) {
        const ward = await this.wardRepository.findById(body.wardId);
        if (!ward) {
            throw ApiError.notFound('Ward not found');
        }

        const existing = await this.roomRepository.findOne({
            wardId: body.wardId,
            roomNumber: body.roomNumber.trim(),
        });
        if (existing) {
            throw ApiError.badRequest(
                'Room number already exists in this ward',
            );
        }

        return this.roomRepository.create({
            wardId: body.wardId,
            roomNumber: body.roomNumber.trim(),
            type: body.type ?? 'GENERAL',
            status: body.status ?? 'ACTIVE',
        });
    }

    listRooms(query) {
        const filter = {};
        if (query.wardId) {
            filter.wardId = query.wardId;
        }
        if (query.status) {
            filter.status = query.status;
        }
        return this.roomRepository.findAll(filter);
    }

    async getRoomById(id) {
        const room = await this.roomRepository.findById(id);
        if (!room) {
            throw ApiError.notFound('Room not found');
        }
        return room;
    }

    async updateRoom(id, body) {
        await this.getRoomById(id);
        const update = {};
        if (body.roomNumber !== undefined) {
            update.roomNumber = body.roomNumber.trim();
        }
        if (body.type !== undefined) {
            update.type = body.type;
        }
        if (body.status !== undefined) {
            update.status = body.status;
        }
        if (body.wardId !== undefined) {
            const ward = await this.wardRepository.findById(body.wardId);
            if (!ward) {
                throw ApiError.notFound('Ward not found');
            }
            update.wardId = body.wardId;
        }
        if (update.roomNumber || update.wardId) {
            const room = await this.roomRepository.findById(id);
            const wardId = update.wardId ?? room.wardId;
            const roomNum = update.roomNumber ?? room.roomNumber;
            const clash = await this.roomRepository.findOne({
                wardId,
                roomNumber: roomNum,
                _id: { $ne: id },
            });
            if (clash) {
                throw ApiError.badRequest(
                    'Room number already exists in this ward',
                );
            }
        }
        return this.roomRepository.updateById(id, { $set: update });
    }

    async deleteRoom(id) {
        await this.getRoomById(id);
        return this.roomRepository.deleteById(id);
    }
}
