import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    activity: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    userAction: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('UserActivity', userActivitySchema);