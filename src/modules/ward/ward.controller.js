import asyncHandler from '../../common/middleware/async-handler.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class WardController {
    constructor(wardService) {
        this.wardService = wardService;
    }

    create = asyncHandler(async (req, res) => {
        const ward = await this.wardService.createWard(req.body);
        return ApiResponse.created(res, 'Ward created successfully', ward);
    });

    list = asyncHandler(async (req, res) => {
        const wards = await this.wardService.listWards(req.query);
        return ApiResponse.ok(res, 'Wards fetched successfully', wards);
    });

    getById = asyncHandler(async (req, res) => {
        const ward = await this.wardService.getWardById(req.params.wardId);
        return ApiResponse.ok(res, 'Ward fetched successfully', ward);
    });

    update = asyncHandler(async (req, res) => {
        const ward = await this.wardService.updateWard(
            req.params.wardId,
            req.body,
        );
        return ApiResponse.ok(res, 'Ward updated successfully', ward);
    });

    remove = asyncHandler(async (req, res) => {
        await this.wardService.deleteWard(req.params.wardId);
        return ApiResponse.ok(res, 'Ward deleted successfully');
    });
}
