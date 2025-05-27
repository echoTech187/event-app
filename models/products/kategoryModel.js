import mongoose from "mongoose";

const kategorySchema = new mongoose.Schema({
    kategoryId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    parentId: {
        type: String,
        ref: 'Kategory',
        required: false
    },
    kategoryName: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createBy: {
        type: String,
        required: false,
        default: null
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
export default mongoose.model('Kategory', kategorySchema);
