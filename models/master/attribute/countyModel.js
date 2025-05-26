import mongoose, { Schema } from "mongoose";
const countrySchema = new mongoose.Schema({
    stateId: {
        type: Schema.Types.ObjectId,
        ref: 'State',
        required: true
    },
    countyName: {
        type: String,
        required: true,
        unique: true
    },
    countyCode: {
        type: Number,
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
    },

});

export default mongoose.model('County', countrySchema);