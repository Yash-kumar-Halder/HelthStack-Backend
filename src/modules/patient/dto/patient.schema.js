import { z } from 'zod';
import { objectIdSchema } from '../../../common/utils/zod/object-id.schema.js';

export const createPatientBodySchema = z.object({
    firstName: z.string().min(1).max(80),
    lastName: z.string().min(1).max(80),
    phone: z.string().max(20).optional().or(z.literal('')),
    dateOfBirth: z.coerce.date().optional().nullable(),
    gender: z.enum(['MALE', 'FEMALE', 'OTHER', 'UNKNOWN']).optional(),
    address: z.string().max(500).optional().or(z.literal('')),
    medicalRecordNumber: z.string().max(40).optional(),
    linkedUserId: objectIdSchema.optional().nullable(),
    status: z.enum(['ACTIVE', 'ARCHIVED']).optional(),
});

export const updatePatientBodySchema = createPatientBodySchema.partial();

export const patientIdParamSchema = z.object({
    patientId: objectIdSchema,
});
