import { SessionRepository } from './session.repository.js';

export class SessionService {
    constructor() {
        this.sessionRepository = new SessionRepository();
    }

    async createSession(data) {
        return await this.sessionRepository.createSession(data);
    }

    async getSessionById(sessionId) {
        return await this.sessionRepository.findById(sessionId);
    }

    async getSessionByUserDevice(userId, userAgent) {
        return await this.sessionRepository.findByUserAndAgent(
            userId,
            userAgent,
        );
    }

    async deleteSessionByUserDevice(userId, userAgent) {
        return await this.sessionRepository.deleteByUserAndAgent(
            userId,
            userAgent,
        );
    }

    async revokeSessionById(userId) {
        return await this.sessionRepository.deleteAll(userId);
    }

    async deleteAllSessions(userId) {
        return await this.sessionRepository.deleteAll(userId);
    }
}
