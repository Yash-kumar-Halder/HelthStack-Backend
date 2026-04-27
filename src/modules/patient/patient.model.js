import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxlength: [80, 'First name max 80 characters'],
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxlength: [80, 'Last name max 80 characters'],
        },
        phone: {
            type: String,
            trim: true,
            maxlength: [20, 'Phone max 20 characters'],
        },
        dateOfBirth: {
            type: Date,
            default: null,
        },
        gender: {
            type: String,
            enum: ['MALE', 'FEMALE', 'OTHER', 'UNKNOWN'],
            default: 'UNKNOWN',
        },
        address: {
            type: String,
            trim: true,
            maxlength: [500, 'Address max 500 characters'],
            default: '',
        },
        medicalRecordNumber: {
            type: String,
            trim: true,
            sparse: true,
            unique: true,
            maxlength: [40, 'MRN max 40 characters'],
        },
        linkedUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'ARCHIVED'],
            default: 'ACTIVE',
        },
    },
    { timestamps: true },
);

patientSchema.index({ phone: 1 });

export const PatientModel =
    mongoose.models.Patient || mongoose.model('Patient', patientSchema);
