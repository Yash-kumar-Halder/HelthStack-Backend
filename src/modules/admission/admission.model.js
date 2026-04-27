import mongoose from 'mongoose';

const admissionEventSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            maxlength: [64, 'Event type max 64 characters'],
        },
        at: {
            type: Date,
            default: Date.now,
        },
        meta: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    { _id: false },
);

const admissionSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Patient',
            required: true,
            index: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
            index: true,
        },
        wardId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ward',
            required: true,
        },
        roomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        bedId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Bed',
            required: true,
        },
        reason: {
            type: String,
            trim: true,
            maxlength: [500, 'Reason max 500 characters'],
            default: '',
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [4000, 'Notes max 4000 characters'],
            default: '',
        },
        diagnosis: {
            type: String,
            trim: true,
            maxlength: [1000, 'Diagnosis max 1000 characters'],
            default: '',
        },
        medicalRecordSummary: {
            type: String,
            trim: true,
            maxlength: [8000, 'Medical record summary max 8000 characters'],
            default: '',
        },
        status: {
            type: String,
            enum: ['ACTIVE', 'DISCHARGED', 'CANCELLED'],
            default: 'ACTIVE',
            index: true,
        },
        admittedAt: {
            type: Date,
            default: Date.now,
        },
        dischargedAt: {
            type: Date,
            default: null,
        },
        events: {
            type: [admissionEventSchema],
            default: [],
        },
        registeredByUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null,
        },
    },
    { timestamps: true },
);

admissionSchema.index({ patientId: 1, admittedAt: -1 });

export const AdmissionModel =
    mongoose.models.Admission || mongoose.model('Admission', admissionSchema);
