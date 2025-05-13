import mongoose from "mongoose";

const userStatusSchema = new mongoose.Schema({
    statusId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
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