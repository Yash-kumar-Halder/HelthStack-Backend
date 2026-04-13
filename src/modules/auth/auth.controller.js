import asyncHandler from '../../common/middleware/async-handler.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register = asyncHandler(async (req, res) => {
        const meta = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
        };
        const result = await this.authService.register(req.body, meta);
        return ApiResponse.created(res, 'User created successfully', result);
    });
}
