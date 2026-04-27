import { PatientModel } from './patient.model.js';

export class PatientRepository {
    create(data) {
        return PatientModel.create(data);
    }

    findById(id) {
        return PatientModel.findById(id).lean();
    }

    findAll(filter = {}) {
        return PatientModel.find(filter)
            .sort({ lastName: 1, firstName: 1 })
            .lean();
    }

    findOne(filter) {
        return PatientModel.findOne(filter).lean();
    }

    updateById(id, update) {
        return PatientModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
        }).lean();
    }

    deleteById(id) {
        return PatientModel.findByIdAndDelete(id).lean();
    }
}
