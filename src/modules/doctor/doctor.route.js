import express from 'express';
import { doctorController } from './doctor.module.js';
import { requireAuth } from '../../common/middleware/require-auth.js';
import { validateRequest } from '../../common/middleware/validate-request.js';
import {
    createDoctorBodySchema,
    doctorIdParamSchema,
    listDoctorsQuerySchema,
    updateDoctorBodySchema,
} from './dto/doctor.schema.js';

const router = express.Router();

router.get(
    '/',
    validateRequest({ query: listDoctorsQuerySchema }),
    doctorController.list,
);
router.get(
    '/:doctorId',
    validateRequest({ params: doctorIdParamSchema }),
    doctorController.getById,
);

router.post(
    '/',
    requireAuth,
    validateRequest({ body: createDoctorBodySchema }),
    doctorController.create,
);
router.patch(
    '/:doctorId',
    requireAuth,
    validateRequest({
        params: doctorIdParamSchema,
        body: updateDoctorBodySchema,
    }),
    doctorController.update,
);
router.delete(
    '/:doctorId',
    requireAuth,
    validateRequest({ params: doctorIdParamSchema }),
    doctorController.remove,
);

export default router;
