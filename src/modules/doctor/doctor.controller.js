import asyncHandler from '../../common/middleware/async-handler.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class DoctorController {
    constructor(doctorService) {
        this.doctorService = doctorService;
    }

    create = asyncHandler(async (req, res) => {
        const doctor = await this.doctorService.createDoctor(req.body);
        return ApiResponse.created(res, 'Doctor created successfully', doctor);
    });

    list = asyncHandler(async (req, res) => {
        const doctors = await this.doctorService.listDoctors(req.query);
        return ApiResponse.ok(res, 'Doctors fetched successfully', doctors);
    });

    getById = asyncHandler(async (req, res) => {
        const doctor = await this.doctorService.getDoctorById(
            req.params.doctorId,
        );
        return ApiResponse.ok(res, 'Doctor fetched successfully', doctor);
    });

    update = asyncHandler(async (req, res) => {
        const doctor = await this.doctorService.updateDoctor(
            req.params.doctorId,
            req.body,
        );
        return ApiResponse.ok(res, 'Doctor updated successfully', doctor);
    });

    remove = asyncHandler(async (req, res) => {
        await this.doctorService.deleteDoctor(req.params.doctorId);
        return ApiResponse.ok(res, 'Doctor deleted successfully');
    });
}
