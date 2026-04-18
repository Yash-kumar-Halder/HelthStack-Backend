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
    login = asyncHandler(async (req, res) => {
        const meta = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
        };
        const result = await this.authService.login(req.body, meta);
        console.log(result.cookieOptions);
        res.cookie('refreshToken', result.refreshToken, result.cookieOptions);
        return ApiResponse.ok(res, 'Login successfull', result);
    });
    refreshTokens = asyncHandler(async (req, res) => {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new Error('Refresh token missing');
        }

        const meta = {
            ipAddress: req.ip,
            userAgent: req.get('User-Agent'),
        };

        const result = await this.authService.refreshTokens(refreshToken, meta);

        return ApiResponse.ok(res, 'Tokens refreshed successfully', result);
    });
}
