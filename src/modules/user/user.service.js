import UserRepository from './user.repository.js';
import ApiError from '../../common/utils/api/api-error.js';
import bcrypt from 'bcrypt';
import { RefreshToken } from '../../common/utils/token/refresh-token.js';
import { RoleModel } from '../role/role.model.js';

export class UserService {
    constructor() {
        this.UserRepository = new UserRepository();
    }

    async createUser({ name, email, password, phone, role }) {
        const existUserWithEmail = await this.UserRepository.findByEmail(email);
        if (existUserWithEmail) {
            throw ApiError.badRequest('User already exist with this email');
        }
        const existUserWithPhone = await this.UserRepository.findByPhone(phone);
        if (existUserWithPhone) {
            throw ApiError.badRequest(
                'User already exist with this phone number',
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = bcrypt.hash(password, salt);

        const roleDb = await RoleModel.findOne({
            name: String(name).toUpperCase(),
        });

        if (!roleDb) {
            return ApiError.badRequest('Invalid role');
        }

        const newUser = await this.UserRepository.create({
            name,
            email,
            password: hashedPassword,
            phone,
            role,
        });
        return newUser;
    }
}
