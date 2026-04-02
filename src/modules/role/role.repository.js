import { RoleModel } from './role.model';

export class RoleRepostory {
    async createRole({ role, description }) {
        return await RoleModel.create({
            name: role,
            description,
        });
    }

    async findById(roleId) {
        return (await RoleModel.findById(roleId)) || null;
    }

    async deleteRoleById(roleId) {
        return await RoleModel.findByIdAndDelete(roleId);
    }

    async updateRoleById(roleId, data) {
        return await RoleModel.findByIdAndUpdate(
            roleId,
            { $set: data },
            { new: true, runValidators: true },
        );
    }
}
