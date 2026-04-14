import { UserModel } from './user.model.js';

export class UserRepository {
    async create(userData) {
        return await UserModel.create(userData);
    }

    async findById(id) {
        return await UserModel.findById(id);
    }

    async findByEmail(email) {
        return await UserModel.findOne({ email });
    }

    async findByEmailWithPassword(email) {
        return await UserModel.findOne({ email }).select('+password');
    }

    async findByPhone(phone) {
        return await UserModel.findOne({ phone });
    }
}
