import { RoomModel } from './room.model.js';

export class RoomRepository {
    create(data) {
        return RoomModel.create(data);
    }

    findById(id) {
        return RoomModel.findById(id).lean();
    }

    findAll(filter = {}) {
        return RoomModel.find(filter).sort({ roomNumber: 1 }).lean();
    }

    findOne(filter) {
        return RoomModel.findOne(filter).lean();
    }

    updateById(id, update) {
        return RoomModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        }).lean();
    }

    deleteById(id) {
        return RoomModel.findByIdAndDelete(id).lean();
    }

    count(filter) {
        return RoomModel.countDocuments(filter);
    }
}
