import jwt from 'jsonwebtoken';

export class RefreshToken {
    static generateRefreshToken(data, expireIn) {
        return jwt.sign(data, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: expireIn,
        });
    }

    static verifyRefreshToken(refreshToken) {
        return jwt.verify(refreshToken, process.env.JWT_SECRET);
    }
}
