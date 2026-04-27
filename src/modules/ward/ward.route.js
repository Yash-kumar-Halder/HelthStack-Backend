import express from 'express';
import { wardController } from './ward.module.js';
import { requireAuth } from '../../common/middleware/require-auth.js';
import { validateRequest } from '../../common/middleware/validate-request.js';
import {
    createWardBodySchema,
    listWardsQuerySchema,
    updateWardBodySchema,
    wardIdParamSchema,
} from './dto/ward.schema.js';

const router = express.Router();

router.get(
    '/',
    validateRequest({ query: listWardsQuerySchema }),
    wardController.list,
);
router.get(
    '/:wardId',
    validateRequest({ params: wardIdParamSchema }),
    wardController.getById,
);

router.post(
    '/',
    requireAuth,
    validateRequest({ body: createWardBodySchema }),
    wardController.create,
);
router.patch(
    '/:wardId',
    requireAuth,
    validateRequest({
        params: wardIdParamSchema,
        body: updateWardBodySchema,
    }),
    wardController.update,
);
router.delete(
    '/:wardId',
    requireAuth,
    validateRequest({ params: wardIdParamSchema }),
    wardController.remove,
);

export default router;
