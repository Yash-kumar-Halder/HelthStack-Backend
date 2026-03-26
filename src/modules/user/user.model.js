import mongoose from "mongoose";

const validateEmail = function (email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: "Email address is required",
        unique: true,
        trim: true,
        lowercare: true,
        validate: [validateEmail, "Please fill a valid email address"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    password: {
        type: String,
        required: "Password is required",
    },
    phone: {
        type: String,
        required: "Phone number is required",
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ["ACTIVE", "SUSPENDED"],
        default: "ACTIVE"
    },

}, {timestamps: true});

export const User = mongoose.models.User || mongoose.model("User", userSchema);