import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: [2, 'Name must be atleast 2 characters'],
            maxLength: [20, 'Name max can be 20 characters'],
        },
        description: {
            type: String,
            required: true,
            minLength: [8, 'Description must be atleast 2 characters'],
            maxLength: [50, 'Description max can be 50 characters'],
        },
    },
    { timestamps: true },
);

export const RoleModel =
    mongoose.models.Role || mongoose.model('Role', roleSchema);
