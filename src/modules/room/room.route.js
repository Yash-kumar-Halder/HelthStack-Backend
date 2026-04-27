import express from 'express';
import { roomController } from './room.module.js';
import { requireAuth } from '../../common/middleware/require-auth.js';
import { validateRequest } from '../../common/middleware/validate-request.js';
import {
    createRoomBodySchema,
    listRoomsQuerySchema,
    roomIdParamSchema,
    updateRoomBodySchema,
} from './dto/room.schema.js';

const router = express.Router();

router.get(
    '/',
    validateRequest({ query: listRoomsQuerySchema }),
    roomController.list,
);
router.get(
    '/:roomId',
    validateRequest({ params: roomIdParamSchema }),
    roomController.getById,
);

router.post(
    '/',
    requireAuth,
    validateRequest({ body: createRoomBodySchema }),
    roomController.create,
);
router.patch(
    '/:roomId',
    requireAuth,
    validateRequest({
        params: roomIdParamSchema,
        body: updateRoomBodySchema,
    }),
    roomController.update,
);
router.delete(
    '/:roomId',
    requireAuth,
    validateRequest({ params: roomIdParamSchema }),
    roomController.remove,
);

export default router;
