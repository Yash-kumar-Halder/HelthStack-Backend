import { SessionRepository } from './session.repository.js';

export class SessionService {
    constructor() {
        this.SessionRepository = new SessionRepository();
    }

    async createSession(data) {
        return await SessionRepository.createSession(data);
    }

    async findSession({ userId, token, userAgent }) {
        return await SessionRepository.findSession({
            userId,
            token,
            userAgent,
        });
    }

    async findAllSession({ userId }) {
        return await SessionRepository.findAllSession({ userId });
    }

    async deleteSession({ userId, token, userAgent }) {
        return await SessionRepository.deleteSession({
            userId,
            token,
            userAgent,
        });
    }

    async deleteAllSession({ userId }) {
        return await SessionRepository.deleteAllSession({
            userId,
        });
    }
}
