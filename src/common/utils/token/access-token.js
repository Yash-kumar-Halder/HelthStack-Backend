import jwt from 'jsonwebtoken';

export class AccessToken {
    generateAccessToken(data, expireIn) {
        return jwt.sign(data, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: expireIn,
        });
    }
}
