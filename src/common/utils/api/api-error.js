export class ApiError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = 'Bad request') {
        return new ApiError(400, message);
    }
    static unauthorized(message = 'Unauthorize') {
        return new ApiError(401, message);
    }
    static paymentRequired(message = 'Payment required') {
        return new ApiError(402, message);
    }
    static forbidden(message = 'Forbidden') {
        return new ApiError(403, message);
    }
    static notFound(message = 'Not found') {
        return new ApiError(404, message);
    }
    static requestTimeout(message = 'Request Timeout') {
        return new ApiError(408, message);
    }
}
