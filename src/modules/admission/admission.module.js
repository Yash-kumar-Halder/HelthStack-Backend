import { BedRepository } from '../bed/bed.repository.js';
import { DoctorRepository } from '../doctor/doctor.repository.js';
import { PatientRepository } from '../patient/patient.repository.js';
import { RoomRepository } from '../room/room.repository.js';
import { WardRepository } from '../ward/ward.repository.js';
import { AdmissionRepository } from './admission.repository.js';
import { AdmissionService } from './admission.service.js';
import AdmissionController from './admission.controller.js';

const admissionRepository = new AdmissionRepository();
const bedRepository = new BedRepository();
const roomRepository = new RoomRepository();
const wardRepository = new WardRepository();
const patientRepository = new PatientRepository();
const doctorRepository = new DoctorRepository();

const admissionService = new AdmissionService(
    admissionRepository,
    bedRepository,
    roomRepository,
    wardRepository,
    patientRepository,
    doctorRepository,
);

const admissionController = new AdmissionController(admissionService);

export { admissionController };
