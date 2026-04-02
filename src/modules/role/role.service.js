import RoleRepository from './role.repository.js';

export class RoleService {
    async createRole({ name, description }) {
        const existingRole = await RoleRepository.findByName(
            name.trim().toLowerCase(),
        );

        if (existingRole) {
            throw new Error('Alreay role exist with this name');
        }

        return await RoleRepository.createRole({ name, description });
    }
}
