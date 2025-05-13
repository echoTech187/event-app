import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import mongoose from 'mongoose';

const app = express()
const port = 3000;

var DB = "mongodb://localhost:27017/event-app";
mongoose.connect(DB);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());



app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);





app.listen(port);
export default app;