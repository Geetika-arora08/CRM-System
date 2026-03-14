
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    contact: {
        type: String,
        required: true
    },
    role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    lowercase: true,
    trim: true
},
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    address: {
        type: String,
        // required: false
    },
    otp: {
        type: String,
        select: false 
    },
    otpExpiry: Date
}, { timestamps: true });


module.exports = mongoose.model("User", UserSchema);