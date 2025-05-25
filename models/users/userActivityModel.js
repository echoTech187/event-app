import mongoose, { Schema } from "mongoose";

const userActivitySchema = new mongoose.Schema({
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
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