import express from "express";
import {
    getAllUserStatus,
    getUserStatusById,
    createUserStatus,
    updateUserStatus,
    deleteUserStatus
} from "../controllers/master/status/userStatusControllers.js";
import { authenticateToken } from "../utils/util.js";

// Define router with express
const router = express.Router();

router.use(express.json());

// ======================== User Status routes ========================================
/** METHODS GET */
/** @openapi
 * '/api/status/user':
 *  get:
 *     tags:
 *     - User Status
 *     summary: Get all user status
 *     parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: Number of user status to return
 *      - in: query
 *        name: start
 *        schema:
 *          type: integer
 *          default: 0
 *        description: Start record number
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.use(authenticateToken).get("/user", getAllUserStatus);

/** METHODS GET */
/** @openapi
 * '/api/status/user/:id':
 *  get:
 *     tags:
 *     - User Status
 *     summary: Get user status by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: String
 *          default: "138bd9ef-1a12-400e-88a6-bd3430624d52"
 *        description: User status id
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.use(authenticateToken).get("/user/:id", getUserStatusById);

/** METHODS POST */
/** @openapi
 * '/api/status/user':
 *  post:
 *     tags:
 *     - User Status
 *     summary: Create a user status
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: Active
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.use(authenticateToken).post("/user", createUserStatus);

/** METHODS PATCH */
/** @openapi
 * '/api/status/user/:id':
 *  patch:
 *     tags:
 *     - User Status
 *     summary: Update a user status
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: "138bd9ef-1a12-400e-88a6-bd3430624d52"
 *        description: User status id
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: Active
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.use(authenticateToken).patch("/user/:id", updateUserStatus);

/** METHODS DELETE */
/** @openapi
 * '/api/status/user/:id':
 *  delete:
 *     tags:
 *     - User Status
 *     summary: Delete a user status
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: "138bd9ef-1a12-400e-88a6-bd3430624d52"
 *        description: User status id
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 * */
router.use(authenticateToken).delete("/user/:id", deleteUserStatus);

export default router;