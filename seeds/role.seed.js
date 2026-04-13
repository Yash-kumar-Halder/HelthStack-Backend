import { RoleModel } from '../src/modules/role/role.model.js';
import { connectToDB } from '../src/common/utils/db/db-connect.js';

const seedRoles = async () => {
    connectToDB();

    const roles = [
        {
            name: 'SUPER_ADMIN',
            description:
                'Full system access with all permissions. Can manage admins, system configuration, roles, and critical operations.',
        },
        {
            name: 'ADMIN',
            description:
                'Administrative user with elevated privileges. Can manage users, doctors, patients, and platform data but limited from core system controls.',
        },
        {
            name: 'DOCTOR',
            description:
                'Healthcare provider with access to patient records, appointments, prescriptions, and medical data relevant to assigned patients.',
        },
        {
            name: 'PATIENT',
            description:
                'End user receiving healthcare services. Can manage personal profile, book appointments, view prescriptions, and access own medical history.',
        },
        {
            name: 'USER',
            description:
                'Default role for general platform users with limited access. Typically used for basic authentication and onboarding before role assignment.',
        },
    ];

    for (const role of roles) {
        const exists = await RoleModel.findOne({ name: role.name });
        if (!exists) {
            await RoleModel.create({
                name: role.name,
                description: role.description,
            });
            console.log(`${role} role created`);
        }
    }

    process.exit();
};

seedRoles();
