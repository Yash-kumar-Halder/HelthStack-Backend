import jwt from 'jsonwebtoken';

export class AccessToken {
    static generateAccessToken(data, expireIn) {
        console.log(process.env.JWT_SECRET);
        return jwt.sign(data, process.env.JWT_SECRET, {
            algorithm: 'HS256',
            expiresIn: expireIn,
        });
    }
}
