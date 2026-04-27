import express from 'express';
import { admissionController } from './admission.module.js';
import { requireAuth } from '../../common/middleware/require-auth.js';
import { validateRequest } from '../../common/middleware/validate-request.js';
import {
    admissionIdParamSchema,
    createAdmissionBodySchema,
} from './dto/admission.schema.js';

const router = express.Router();

router.post(
    '/',
    requireAuth,
    validateRequest({ body: createAdmissionBodySchema }),
    admissionController.admit,
);

router.patch(
    '/:admissionId/discharge',
    requireAuth,
    validateRequest({ params: admissionIdParamSchema }),
    admissionController.discharge,
);

router.get(
    '/:admissionId',
    requireAuth,
    validateRequest({ params: admissionIdParamSchema }),
    admissionController.getById,
);

export default router;
