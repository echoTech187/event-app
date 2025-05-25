import mongoose from "mongoose";

const userStatusSchema = new mongoose.Schema({
    statusId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    deletedBy: {
        type: String,
        required: false,
        default: null
    },
    deletedAt: {
        type: Date,
        required: false,
        default: null
    },
    updatedBy: {
        type: String,
        required: false,
        default: null
    },
    updatedAt: {
        type: Date,
        required: false,
        default: null
    },
    createdBy: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('UserStatus', userStatusSchema);