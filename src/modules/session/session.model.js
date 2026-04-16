import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    refreshTokenHash: {
        type: String,
        required: true,
        default: null,
    },
    tokenExpireAt: {
        type: Date,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    isRevoke: {
        type: Boolean,
        default: false,
    },
});

export const SessionModel =
    mongoose.models.Session || mongoose.model('Session', SessionSchema);
