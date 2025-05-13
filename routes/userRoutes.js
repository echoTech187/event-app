import express from "express";
import * as userController from "../controllers/users/usersControllers.js";
import { authenticateToken } from "../utils/util.js";

// Define router with express
const router = express.Router();

router.use(express.json());

router.get("/search", userController.getUser);
// ======================== User routes ========================================

/*  GET ALL USERS 
    GET /api/users
    filter with 
    Params : (:id),
    Query urlPathParam,
    Body Object
*/
router.use(authenticateToken).get("/", userController.getAllUsers);

/*  GET USER BY ID 
    GET /api/users/:id
    Params: :id
    Query: params
*/
router.use(authenticateToken).get("/:id", userController.getUserById);

/*  CREATE USER 
    POST /api/users
    Created a new user
    Body: Object
*/
router.use(authenticateToken).post("/", userController.createUser);

/*  UPDATE USER
    PATCH /api/users/:id
    Updated a user 
    Params: :id
    Body: Object
*/
router.use(authenticateToken).patch("/:id", userController.updateUser);

/*  DELETE USER
    DELETE /api/users/:id
    Deleted a user 
    Params: :id
*/
router.use(authenticateToken).delete("/:id", userController.deleteUser);

// export router
export default router;