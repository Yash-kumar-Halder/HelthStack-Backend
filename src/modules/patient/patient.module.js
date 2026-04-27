import { PatientRepository } from './patient.repository.js';
import { PatientService } from './patient.service.js';
import PatientController from './patient.controller.js';

const patientRepository = new PatientRepository();
const patientService = new PatientService(patientRepository);
const patientController = new PatientController(patientService);

export { patientController };
