import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userStatusRoutes from './routes/userStatusRoutes.js';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
const app = express();
const port = 3000;

var DB = "mongodb://localhost:27017/event-app";
mongoose.connect(DB);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/status', userStatusRoutes);





app.listen(port);
export default app;