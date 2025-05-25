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

/** POST Methods */
/**
 * @openapi
 * '/api/auth/register':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *              - passwordConfirm
 *
 *            properties:
 *              firstName:
 *                type: string
 *                default: johndoe 
 *              lastName:
 *                type: string
 *                default: Doe
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *              passwordConfirm:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      201:
 *        description: Created
 *      409:
 *        description: Conflict
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.post('/register', register);
/**
 * @openapi
 * '/api/auth/login':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *              password:
 *                type: string
 *                default: johnDoe20!@
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.post('/login', login);
/**
 * @openapi
 * '/api/auth/oAuth':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Login with oAuth
 *     security: []
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.post('/oAuth', oAuthHandler);

/** PATCH Methods */
/**
 * @openapi
 * '/api/auth/refreshToken':
 *  patch:
 *     tags:
 *     - Authentication
 *     summary: Refresh user token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - refreshToken
 *            properties:
 *              refreshToken:
 *                type: string  
 *                default: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.patch('/refreshToken', refreshToken);

/** PATCH Methods */
/**
 * @openapi
 * '/api/auth/forgetPassword':
 *  patch:
 *     tags:
 *     - Authentication
 *     summary: Forget password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                default: johndoe@mail.com
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.patch('/forgetPassword', forgetPassword);
/** POST Methods */
/**
 * @openapi
 * '/api/auth/logout':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: Logout a user
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.use(authenticateToken).post('/logout', logout);


export default router;