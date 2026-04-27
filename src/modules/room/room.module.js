import { WardRepository } from '../ward/ward.repository.js';
import { RoomRepository } from './room.repository.js';
import { RoomService } from './room.service.js';
import RoomController from './room.controller.js';

const wardRepository = new WardRepository();
const roomRepository = new RoomRepository();
const roomService = new RoomService(roomRepository, wardRepository);
const roomController = new RoomController(roomService);

export { roomController };
