import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './src/modules/auth/auth.route.js';
import errorHandler from './src/common/middleware/error-handler.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server running',
    });
});

app.use('/api/auth', AuthRoutes);

app.use(errorHandler);

export default app;
