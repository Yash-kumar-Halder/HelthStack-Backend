import { AdmissionModel } from './admission.model.js';

export class AdmissionRepository {
    async create(data, options = {}) {
        const createOpts = {};
        if (options.session) {
            createOpts.session = options.session;
        }
        const docs = await AdmissionModel.create([data], createOpts);
        const doc = docs[0];
        return doc.toObject ? doc.toObject() : doc;
    }

    findById(id, options = {}) {
        const q = AdmissionModel.findById(id);
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }

    /** Mutable document for transactions */
    findDocumentById(id, session) {
        return AdmissionModel.findById(id).session(session);
    }

    findByPatientId(patientId) {
        return AdmissionModel.find({ patientId })
            .sort({ admittedAt: -1 })
            .lean();
    }

    findActiveByBedId(bedId, options = {}) {
        const q = AdmissionModel.findOne({
            bedId,
            status: 'ACTIVE',
        });
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }

    findActiveByPatientId(patientId, options = {}) {
        const q = AdmissionModel.findOne({
            patientId,
            status: 'ACTIVE',
        });
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }

    updateById(id, update, options = {}) {
        const q = AdmissionModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
            ...options,
        });
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }
}
