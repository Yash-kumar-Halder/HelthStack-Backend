import { DoctorModel } from './doctor.model.js';

export class DoctorRepository {
    create(data) {
        return DoctorModel.create(data);
    }

    findById(id) {
        return DoctorModel.findById(id).lean();
    }

    findAll(filter = {}) {
        return DoctorModel.find(filter)
            .sort({ lastName: 1, firstName: 1 })
            .lean();
    }

    findOne(filter) {
        return DoctorModel.findOne(filter).lean();
    }

    updateById(id, update) {
        return DoctorModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        }).lean();
    }

    deleteById(id) {
        return DoctorModel.findByIdAndDelete(id).lean();
    }
}
