import asyncHandler from '../../common/middleware/async-handler.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class AdmissionController {
    constructor(admissionService) {
        this.admissionService = admissionService;
    }

    admit = asyncHandler(async (req, res) => {
        const admission = await this.admissionService.admit(
            req.body,
            req.auth?.userId,
        );
        return ApiResponse.created(
            res,
            'Patient admitted successfully',
            admission,
        );
    });

    discharge = asyncHandler(async (req, res) => {
        const admission = await this.admissionService.discharge(
            req.params.admissionId,
            req.auth?.userId,
        );
        return ApiResponse.ok(
            res,
            'Patient discharged successfully',
            admission,
        );
    });

    listByPatientId = asyncHandler(async (req, res) => {
        const list = await this.admissionService.listByPatientId(
            req.params.patientId,
        );
        return ApiResponse.ok(
            res,
            'Admission history fetched successfully',
            list,
        );
    });

    getById = asyncHandler(async (req, res) => {
        const admission = await this.admissionService.getById(
            req.params.admissionId,
        );
        return ApiResponse.ok(res, 'Admission fetched successfully', admission);
    });
}
