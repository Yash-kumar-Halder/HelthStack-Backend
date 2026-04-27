import { z } from 'zod';
import { objectIdSchema } from '../../../common/utils/zod/object-id.schema.js';

export const createRoomBodySchema = z.object({
    wardId: objectIdSchema,
    roomNumber: z.string().min(1).max(32),
    type: z
        .enum([
            'GENERAL',
            'ICU',
            'NICU',
            'PRIVATE',
            'SEMI_PRIVATE',
            'ISOLATION',
        ])
        .optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const updateRoomBodySchema = createRoomBodySchema.partial();

export const roomIdParamSchema = z.object({
    roomId: objectIdSchema,
});

export const listRoomsQuerySchema = z.object({
    wardId: objectIdSchema.optional(),
    status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});
