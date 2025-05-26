import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user/userRoutes.js';
import authRoutes from './routes/auth/authRoutes.js';
import merchantStatusRoutes from './routes/merchant/merchantStatusRoutes.js';
import userStatusRoutes from './routes/user/userStatusRoutes.js';
import provinceRoutes from './routes/master/attribute/provinceRoutes.js';
import merchantRoutes from './routes/merchant/merchantRoutes.js';
import stateRoutes from './routes/master/attribute/stateRoutes.js';
import cityRoutes from './routes/master/attribute/cityRoutes.js';
import countriesRoutes from './routes/master/attribute/countriesRoutes.js';
import productRoutes from './routes/product/productsRoutes.js';
import formidable from 'express-formidable';
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
app.use(formidable());
/* ================== CORS Config ==================================== */
app.use(cors());
app.use(express.static('public'));
app.use('/product', express.static('public/images/products'));
/* ================== Routes Docs ==================================== */
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/* ================== Routes Core ==================================== */
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/merchants', merchantRoutes);
app.use('/api/products', productRoutes);


/* ================== Routes Attributes ==================================== */
app.use('/api/status', userStatusRoutes);
app.use('/api/merchant/status', merchantStatusRoutes);
app.use('/api/province', provinceRoutes);
app.use('/api/city', cityRoutes);
app.use('/api/state', stateRoutes);
app.use('/api/countries', countriesRoutes);






/* ================== Start Server ==================================== */
app.listen(port);


export default app;