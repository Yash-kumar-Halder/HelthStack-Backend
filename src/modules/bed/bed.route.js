import express from 'express';
import { bedController } from './bed.module.js';
import { requireAuth } from '../../common/middleware/require-auth.js';
import { validateRequest } from '../../common/middleware/validate-request.js';
import {
    availabilityQuerySchema,
    bedIdParamSchema,
    createBedBodySchema,
    listBedsQuerySchema,
    updateBedBodySchema,
} from './dto/bed.schema.js';

const router = express.Router();

router.get(
    '/availability',
    validateRequest({ query: availabilityQuerySchema }),
    bedController.availability,
);
router.get(
    '/',
    validateRequest({ query: listBedsQuerySchema }),
    bedController.list,
);
router.get(
    '/:bedId',
    validateRequest({ params: bedIdParamSchema }),
    bedController.getById,
);

router.post(
    '/',
    requireAuth,
    validateRequest({ body: createBedBodySchema }),
    bedController.create,
);
router.patch(
    '/:bedId',
    requireAuth,
    validateRequest({
        params: bedIdParamSchema,
        body: updateBedBodySchema,
    }),
    bedController.update,
);
router.delete(
    '/:bedId',
    requireAuth,
    validateRequest({ params: bedIdParamSchema }),
    bedController.remove,
);

export default router;
