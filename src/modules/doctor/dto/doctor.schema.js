import { z } from 'zod';
import { objectIdSchema } from '../../../common/utils/zod/object-id.schema.js';

export const createDoctorBodySchema = z.object({
    firstName: z.string().min(1).max(80),
    lastName: z.string().min(1).max(80),
    department: z.string().min(2).max(120),
    licenseId: z.string().min(2).max(64),
    email: z.union([z.string().email().max(120), z.literal('')]).optional(),
    phone: z.string().max(20).optional().or(z.literal('')),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const updateDoctorBodySchema = createDoctorBodySchema.partial();

export const doctorIdParamSchema = z.object({
    doctorId: objectIdSchema,
});

export const listDoctorsQuerySchema = z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
    department: z.string().max(120).optional(),
});
