import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import merchantStatusRoutes from './routes/merchantStatusRoutes.js';
import userStatusRoutes from './routes/userStatusRoutes.js';
import provinceRoutes from './routes/provinceRoutes.js';
import merchantRoutes from './routes/merchantRoutes.js';
import cityRoutes from './routes/cityRoutes.js';
import mongoose from 'mongoose';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

/* ================== Express App ==================================== */
const app = express();
/* ================== Port ==================================== */
const port = 3000;
/* ================== DB Connection ==================================== */
var DB = "mongodb://localhost:27017/event-app";
mongoose.connect(DB);


/* ================== Middlewares ==================================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ================== CORS Config ==================================== */
app.use(cors());

/* ================== Routes Docs ==================================== */
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/* ================== Routes Core ==================================== */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/merchants', merchantRoutes);


/* ================== Routes Attributes ==================================== */
app.use('/api/status', userStatusRoutes);
app.use('/api/merchant/status', merchantStatusRoutes);
app.use('/api/province', provinceRoutes);
app.use('/api/city', cityRoutes);






/* ================== Start Server ==================================== */
app.listen(port);


export default app;