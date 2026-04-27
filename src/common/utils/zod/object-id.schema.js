import { z } from 'zod';

/** MongoDB ObjectId as 24-char hex string */
export const objectIdSchema = z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid MongoDB ObjectId');
