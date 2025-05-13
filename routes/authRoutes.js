import express from 'express';
import { authenticateToken } from '../utils/util.js';
import { 
    register, 
    login, 
    oAuthHandler, 
    refreshToken, 
    forgetPassword, 
    logout 

} from '../controllers/authentication/authControllers.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/oAuth', oAuthHandler);
router.patch('/refreshToken', refreshToken);
router.patch('/forgetPassword', forgetPassword);
router.use(authenticateToken).post('/logout', logout);


export default router;