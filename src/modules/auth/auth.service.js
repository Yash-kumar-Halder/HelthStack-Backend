import { AccessToken } from '../../common/utils/token/access-token.js';
import crypto from 'crypto';
import { SessionService } from '../session/session.service.js';
import { UserService } from '../user/user.service.js';
import bcrypt from 'bcrypt';

export class AuthService {
    static async register(data) {
        const user = await UserService.createUser(data);
        return this._generateAuthResponse(user);
    }

    static async login({ email, password }, meta = {}) {
        const { ipAddress = null, userAgent = null } = meta;

        // 1. Find user
        const user = await UserService.findByEmail(email);
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

    static async _generateAuthResponse(user, meta = {}) {
        const { ipAddress = null, userAgent = null } = meta;
        const accessToken = AccessToken.generateAccessToken(
            user,
            15 * 60 * 1000,
        );

        // Create tokenId for DB lookup
        const tokenId = crypto.randomUUID();

        const rawToken = crypto.randomBytes(40).toString('hex');
        const hashedToken = await bcrypt.hash(rawToken, 10);

        const refreshToken = `${tokenId}.${rawToken}`;

        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await SessionService.createSession({
            user: user._id,
            tokenId,
            token: hashedToken,
            tokenExpireAt: expireAt,
            ipAddress,
            userAgent,
        });

        return {
            user,
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
