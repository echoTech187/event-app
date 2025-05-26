import mongoose, { Schema } from "mongoose";
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    username: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    firstName: {
        type: String,
        required: false,
        default: null
    },
    lastName: {
        type: String,
        required: false,
        default: null
    },
    phoneNumber: {
        type: String,
        required: false,
        default: null,
        unique: true
    },
    address: {
        type: String,
        required: false,
        default: null
    },
    gender: {
        type: String,
        required: false,
        default: null
    },
    dateOfBirth: {
        type: Date,
        required: false,
        default: null
    },
    profilePicture: {
        type: String,
        required: false,
        default: null
    },
    roleAccess: {
        type: String,
        required: false,
        default: null
    },
    status: {
        type: String,
        ref: 'UserStatus',
        required: true
    },
    activeDate: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    lastLogin: {
        type: Date,
        default: null
    },
    lastLogout: {
        type: Date,
        default: null
    },
    lastUpdated: {
        type: Date,
        default: null
    },
    lastDeleted: {
        type: Date,
        default: null
    },
    lastVerified: {
        type: Date,
        default: null
    },
    lastBlocked: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    userActivity: {
        type: Array,
        default: []
    },
    token: {
        type: String,
        default: null
    }
})
export default mongoose.model('User', userSchema);