import { BedModel } from './bed.model.js';

export class BedRepository {
    create(data) {
        return BedModel.create(data);
    }

    findById(id, options = {}) {
        const q = BedModel.findById(id);
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }

    findByIdForUpdate(id, session) {
        return BedModel.findById(id).session(session);
    }

    findAll(filter = {}) {
        return BedModel.find(filter).sort({ bedNumber: 1 }).lean();
    }

    findOne(filter, options = {}) {
        const q = BedModel.findOne(filter);
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }

    updateById(id, update, options = {}) {
        const q = BedModel.findByIdAndUpdate(id, update, {
            new: true,
            runValidators: true,
            ...options,
        });
        if (options.session) {
            q.session(options.session);
        }
        return q.lean();
    }

    deleteById(id) {
        return BedModel.findByIdAndDelete(id).lean();
    }

    aggregateStatusCounts(filter) {
        return BedModel.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);
    }
}
