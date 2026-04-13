import asyncHandler from '../../common/middleware/async-handler.js';
import AuthService from './auth.service.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class AuthController {
    static register = asyncHandler(async (req, res) => {
        const result = await AuthService.register(req.body);
        return ApiResponse.created(res, 'User created successfully', result);
    });
}
