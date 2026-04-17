import { AccessToken } from '../../common/utils/token/access-token.js';
import bcrypt from 'bcrypt';
import { UserResponseDTO } from '../user/dto/user-response.dto.js';
import { RefreshToken } from '../../common/utils/token/refresh-token.js';
import { Hash } from '../../common/utils/token/hash.js';
import { SessionModel } from '../session/session.model.js';

export class AuthService {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    async register(data, meta = {}) {
        const user = await this.userService.createUser(data);
        return this._generateAuthResponse(user, meta);
    }

    async login({ email, password }, meta = {}) {
        const { ipAddress = null, userAgent = null } = meta;

        // 1. Find user
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // 4. Generate tokens + session
        return this._generateAuthResponse(user, {
            ipAddress,
            userAgent,
        });
    }

    async _generateAuthResponse(user, meta = {}) {
        const { ipAddress = null, userAgent = null } = meta;

        const payload = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        };

        const accessToken = AccessToken.generateAccessToken(payload, '15m');

        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        // delete old session for this device
        await this.sessionService.deleteSessionByUserDevice(
            user._id,
            userAgent,
        );

        // create session instance (NOT saved yet)
        const session = new SessionModel({
            user: user._id,
            ipAddress,
            userAgent,
            tokenExpireAt: expireAt,
        });

        // generate refresh token
        const refreshToken = RefreshToken.generateRefreshToken(
            { userId: user._id, sessionId: session._id },
            '7d',
        );

        // hash + save
        session.refreshTokenHash = await Hash.hash(refreshToken);
        await session.save();

        return {
            user: new UserResponseDTO(user),
            accessToken,
            refreshToken,
            cookieOptions: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite:
                    process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',
                path: '/auth/refresh',
                maxAge: 7 * 24 * 60 * 60 * 1000,
            },
        };
    }
}
