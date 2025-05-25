import mongoose from 'mongoose';

const DB = "mongodb://localhost:27017/event-app";
const db = await mongoose.connect(DB);

export default db;