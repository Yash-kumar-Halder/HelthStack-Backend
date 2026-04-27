import asyncHandler from '../../common/middleware/async-handler.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class BedController {
    constructor(bedService) {
        this.bedService = bedService;
    }

    create = asyncHandler(async (req, res) => {
        const bed = await this.bedService.createBed(req.body);
        return ApiResponse.created(res, 'Bed created successfully', bed);
    });

    list = asyncHandler(async (req, res) => {
        const beds = await this.bedService.listBeds(req.query);
        return ApiResponse.ok(res, 'Beds fetched successfully', beds);
    });

    availability = asyncHandler(async (req, res) => {
        const data = await this.bedService.getAvailability(req.query);
        return ApiResponse.ok(
            res,
            'Bed availability fetched successfully',
            data,
        );
    });

    getById = asyncHandler(async (req, res) => {
        const bed = await this.bedService.getBedById(req.params.bedId);
        return ApiResponse.ok(res, 'Bed fetched successfully', bed);
    });

    update = asyncHandler(async (req, res) => {
        const bed = await this.bedService.updateBed(req.params.bedId, req.body);
        return ApiResponse.ok(res, 'Bed updated successfully', bed);
    });

    remove = asyncHandler(async (req, res) => {
        await this.bedService.deleteBed(req.params.bedId);
        return ApiResponse.ok(res, 'Bed deleted successfully');
    });
}
