import { z } from 'zod';
import { objectIdSchema } from '../../../common/utils/zod/object-id.schema.js';

export const createWardBodySchema = z.object({
    name: z.string().min(2).max(120),
    code: z.string().min(2).max(32),
    floor: z.number().int().optional().nullable(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const updateWardBodySchema = createWardBodySchema.partial();

export const wardIdParamSchema = z.object({
    wardId: objectIdSchema,
});

export const listWardsQuerySchema = z.object({
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});
