import express from "express";
import {
    getAllUserStatus,
    getUserStatusById,
    createUserStatus,
    updateUserStatus,
    deleteUserStatus
} from "../controllers/master/userStatusControllers.js";
import { authenticateToken } from "../utils/util.js";

// Define router with express
const router = express.Router();

router.use(express.json());

router.use(authenticateToken).get("/user", getAllUserStatus);
router.use(authenticateToken).get("/user/:id", getUserStatusById);
router.use(authenticateToken).post("/user", createUserStatus);
router.use(authenticateToken).patch("/user/:id", updateUserStatus);
router.use(authenticateToken).delete("/user/:id", deleteUserStatus);

export default router;