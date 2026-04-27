import { WardRepository } from './ward.repository.js';
import { WardService } from './ward.service.js';
import WardController from './ward.controller.js';

const wardRepository = new WardRepository();
const wardService = new WardService(wardRepository);
const wardController = new WardController(wardService);

export { wardController };
