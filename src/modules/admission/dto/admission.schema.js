import { z } from 'zod';
import { objectIdSchema } from '../../../common/utils/zod/object-id.schema.js';

export const createAdmissionBodySchema = z.object({
    patientId: objectIdSchema,
    doctorId: objectIdSchema,
    wardId: objectIdSchema,
    roomId: objectIdSchema,
    bedId: objectIdSchema,
    reason: z.string().max(500).optional().or(z.literal('')),
    notes: z.string().max(4000).optional().or(z.literal('')),
    diagnosis: z.string().max(1000).optional().or(z.literal('')),
    medicalRecordSummary: z.string().max(8000).optional().or(z.literal('')),
    admittedAt: z.coerce.date().optional(),
});

export const admissionIdParamSchema = z.object({
    admissionId: objectIdSchema,
});
