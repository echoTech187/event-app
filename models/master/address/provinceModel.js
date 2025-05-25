import mongoose from "mongoose";
const provinceSchema = new mongoose.Schema({
    provinceId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    provinceName: {
        type: String,
        required: true
    },
    provinceCode: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
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
    }
});

export default mongoose.model('Province', provinceSchema);