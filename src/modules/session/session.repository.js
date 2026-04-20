import { SessionModel } from './session.model.js';

export class SessionRepository {
    async createSession(data) {
        return await SessionModel.create(data);
    }

    async findById(sessionId) {
        return await SessionModel.findById(sessionId);
    }

    async findByUserAndAgent(userId, userAgent) {
        return await SessionModel.findOne({ user: userId, userAgent });
    }

    async deleteByUserAndAgent(userId, userAgent) {
        return await SessionModel.deleteOne({ user: userId, userAgent });
    }

    async deleteOne(sessionId) {
        return await SessionModel.deleteOne({ _id: sessionId });
    }
    async revokeSessionById(sessionId) {
        return await SessionModel.findByIdAndUpdate(
            sessionId,
            { revoke: true },
            { new: true },
        );
    }
    async deleteAll(userId) {
        return await SessionModel.deleteMany({ user: userId });
    }
}
