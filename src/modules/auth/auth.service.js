import { AccessToken } from '../../common/utils/token/access-token.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { UserResponseDTO } from '../user/dto/user-response.dto.js';

export class AuthService {
    constructor(userService, sessionService) {
        this.userService = userService;
        this.sessionService = sessionService;
    }

    async register(data, meta = {}) {
        const user = await this.userService.createUser(data);
        console.log(user);
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
        const accessToken = AccessToken.generateAccessToken(
            payload,
            15 * 60 * 1000,
        );

        // Create tokenId for DB lookup
        const tokenId = crypto.randomUUID();

        const rawToken = crypto.randomBytes(40).toString('hex');
        const hashedToken = await bcrypt.hash(rawToken, 10);

        const refreshToken = `${tokenId}.${rawToken}`;

        const expireAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

        await this.sessionService.createSession({
            user: user._id,
            tokenId,
            token: hashedToken,
            tokenExpireAt: expireAt,
            ipAddress,
            userAgent,
        });

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
