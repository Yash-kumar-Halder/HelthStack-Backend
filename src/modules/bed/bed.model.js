import mongoose from 'mongoose';

const bedSchema = new mongoose.Schema(
    {
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
            index: true,
        },
        bedNumber: {
            type: String,
            required: true,
            trim: true,
            maxlength: [32, 'Bed number max 32 characters'],
        },
        status: {
            type: String,
            enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'],
            default: 'AVAILABLE',
        },
        currentAdmissionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Admission',
            default: null,
        },
    },
    { timestamps: true },
);

bedSchema.index({ roomId: 1, bedNumber: 1 }, { unique: true });

export const BedModel = mongoose.models.Bed || mongoose.model('Bed', bedSchema);
