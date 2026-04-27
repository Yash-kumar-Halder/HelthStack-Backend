import { z } from 'zod';
import { objectIdSchema } from '../../../common/utils/zod/object-id.schema.js';

export const bedStatusEnum = z.enum(['AVAILABLE', 'OCCUPIED', 'MAINTENANCE']);

export const createBedBodySchema = z.object({
    roomId: objectIdSchema,
    bedNumber: z.string().min(1).max(32),
    status: bedStatusEnum.optional(),
});

export const updateBedBodySchema = z.object({
    roomId: objectIdSchema.optional(),
    bedNumber: z.string().min(1).max(32).optional(),
    status: bedStatusEnum.optional(),
});

export const bedIdParamSchema = z.object({
    bedId: objectIdSchema,
});

export const listBedsQuerySchema = z.object({
    roomId: objectIdSchema.optional(),
    status: bedStatusEnum.optional(),
});

export const availabilityQuerySchema = z.object({
    roomId: objectIdSchema.optional(),
});
