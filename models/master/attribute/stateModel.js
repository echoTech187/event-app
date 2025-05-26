import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
    stateId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    stateCode: {
        type: Number,
        required: true,
        unique: true
    },
    cityId: {
        type: String,
        ref: 'City',
        required: true
    },
    stateName: {
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
export default mongoose.model('State', stateSchema);