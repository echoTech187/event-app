import mongoose from "mongoose";
const stateSchema = new mongoose.Schema({
    stateId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    stateCode: {
        type: String,
        required: true
    },
    cityId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        required: true
    }],
    stateName: {
        type: String,
        required: true
    }
});
export default mongoose.model('State', stateSchema);