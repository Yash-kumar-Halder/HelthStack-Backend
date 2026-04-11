import { SessionModel } from './session.model.js';

export class SessionRepository {
    static async createSession(data) {
        return await SessionModel.create(data);
    }
    async findSession({ userId, token, userAgent }) {
        return await SessionModel.findOne({
            user: userId,
            token,
            userAgent,
            expireAt: { $gt: new Date() },
        });
    }
    async findAllSession({ userId }) {
        return await SessionModel.findOne({
            user: userId,
            expireAt: { $gt: new Date() },
        });
    }

    async deleteSession({ userId, token, userAgent }) {
        return await SessionModel.deleteOne({
            user: userId,
            token,
            userAgent,
        });
    }

    async deleteAll({ userId }) {
        return await SessionModel.deleteMany({
            user: userId,
        });
    }
}
