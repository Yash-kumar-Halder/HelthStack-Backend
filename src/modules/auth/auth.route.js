import express from 'express';
import { authController } from './auth.module.js';

const router = express.Router();

router.post('/register', authController.register);

export default router;
