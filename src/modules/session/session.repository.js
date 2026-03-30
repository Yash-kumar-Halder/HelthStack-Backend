import { SessionModel } from './session.model';

export class SessionRepository {
    async create(data) {
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
    async findAllSession({ userId, token }) {
        return await SessionModel.findOne({
            user: userId,
            token,
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
