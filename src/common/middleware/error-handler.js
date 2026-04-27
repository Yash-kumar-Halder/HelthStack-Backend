import 'dotenv/config';

const errorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({
        success: false,
        message: err.message,
        ...(process.env.NODE_ENV === 'DEVELOPMENT' && {
            stack: err.stack,
        }),
    });
};

export default errorHandler;
