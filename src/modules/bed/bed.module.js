import { RoomRepository } from '../room/room.repository.js';
import { WardRepository } from '../ward/ward.repository.js';
import { BedRepository } from './bed.repository.js';
import { BedService } from './bed.service.js';
import BedController from './bed.controller.js';

const wardRepository = new WardRepository();
const roomRepository = new RoomRepository();
const bedRepository = new BedRepository();
const bedService = new BedService(
    bedRepository,
    roomRepository,
    wardRepository,
);
const bedController = new BedController(bedService);

export { bedController };
