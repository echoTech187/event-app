import mongoose from "mongoose";
const citySchema = new mongoose.Schema({
    cityId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    provinceId: {
        type: String,
        ref: 'Province',
        required: true
    },
    cityName: {
        type: String,
        required: true
    },
    cityCode: {
        type: String,
        required: true
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
export default mongoose.model('City', citySchema);