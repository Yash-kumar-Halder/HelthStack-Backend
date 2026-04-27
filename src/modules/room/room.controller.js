import asyncHandler from '../../common/middleware/async-handler.js';
import { ApiResponse } from '../../common/utils/api/api-response.js';

export default class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }

    create = asyncHandler(async (req, res) => {
        const room = await this.roomService.createRoom(req.body);
        return ApiResponse.created(res, 'Room created successfully', room);
    });

    list = asyncHandler(async (req, res) => {
        const rooms = await this.roomService.listRooms(req.query);
        return ApiResponse.ok(res, 'Rooms fetched successfully', rooms);
    });

    getById = asyncHandler(async (req, res) => {
        const room = await this.roomService.getRoomById(req.params.roomId);
        return ApiResponse.ok(res, 'Room fetched successfully', room);
    });

    update = asyncHandler(async (req, res) => {
        const room = await this.roomService.updateRoom(
            req.params.roomId,
            req.body,
        );
        return ApiResponse.ok(res, 'Room updated successfully', room);
    });

    remove = asyncHandler(async (req, res) => {
        await this.roomService.deleteRoom(req.params.roomId);
        return ApiResponse.ok(res, 'Room deleted successfully');
    });
}
