import { DoctorRepository } from './doctor.repository.js';
import { DoctorService } from './doctor.service.js';
import DoctorController from './doctor.controller.js';

const doctorRepository = new DoctorRepository();
const doctorService = new DoctorService(doctorRepository);
const doctorController = new DoctorController(doctorService);

export { doctorController };
