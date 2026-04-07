import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    tokenId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    token: {
        type: String,
        required: true,
        unique: true,
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
    revoke: {
        type: Boolean,
        default: false,
    },
});

export const SessionModel =
    mongoose.models.Session || mongoose.model('Session', SessionSchema);
