import { WardModel } from './ward.model.js';

export class WardRepository {
    create(data) {
        return WardModel.create(data);
    }

    findById(id) {
        return WardModel.findById(id).lean();
    }

    findAll(filter = {}) {
        return WardModel.find(filter).sort({ name: 1 }).lean();
    }

    findOne(filter) {
        return WardModel.findOne(filter).lean();
    }

    updateById(id, update) {
        return WardModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        }).lean();
    }

    deleteById(id) {
        return WardModel.findByIdAndDelete(id).lean();
    }
}
