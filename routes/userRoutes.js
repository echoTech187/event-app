import express from "express";
import * as userController from "../controllers/users/usersControllers.js";
import { authenticateToken } from "../utils/util.js";

// Define router with express
const router = express.Router();

router.use(express.json());

router.use(authenticateToken).get("/search", userController.getUser);
// ======================== User routes ========================================

/** METHODS GET */
/** @openapi
 * '/api/users':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get all users
 
 *     parameters:
 *      - in: query
 *        name: limit
 *        schema:
 *          type: integer
 *          default: 10
 *        description: Number of users to return
 *      - in: query
 *        name: start
 *        schema:
 *          type: integer
 *          default: 0
 *        description: Starting index of users to return
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.use(authenticateToken).get("/", userController.getAllUsers);
/** METHODS GET */
/** @openapi
 * '/api/users/:id':
 *  get:
 *     tags:
 *     - Users
 *     summary: Get a user by id
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: String
 *          default: "138bd9ef-1a12-400e-88a6-bd3430624d52"
 *        description: User id
 
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.use(authenticateToken).get("/:id", userController.getUserById);

/** METHODS POST */
/** @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - Users
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
 *            properties:
 *              firstName:
 *                type: string
 *                default: John
 *              lastName:
 *                type: string
 *                default: Doe
 *              email:
 *                type: string
 *                default: johndoe@mailcom
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
 */
router.use(authenticateToken).post("/", userController.createUser);

/** METHODS PATCH  */
/** @openapi
 * '/api/users/:id':
 *  patch:
 *     tags:
 *     - Users
 *     summary: Update a user
 
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: "138bd9ef-1a12-400e-88a6-bd3430624d52"
 *        description: User id
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
 *            properties:
 *              firstName:
 *                type: string
 *                default: John
 *              lastName:
 *                type: string
 *                default: Doe
 *              email:
 *                type: string
 *                default: johndoe@mailcom
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
 */
router.use(authenticateToken).patch("/:id", userController.updateUser);

/** METHODS DELETE */
/** @openapi
 * '/api/users/:id':
 *  delete:
 *     tags:
 *     - Users
 *     summary: Delete a user
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *          default: "138bd9ef-1a12-400e-88a6-bd3430624d52"
 *        description: User id
 *     responses:
 *      200:
 *        description: Success
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error
 */
router.use(authenticateToken).delete("/:id", userController.deleteUser);

// export router
export default router;