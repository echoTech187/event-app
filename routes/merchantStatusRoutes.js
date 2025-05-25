import express from "express";
import { getAllMerchantStatus, getMerchantStatusById, createMerchantStatus, updateMerchantStatus, deleteMerchantStatus } from "../controllers/master/status/merchantStatusControllers.js";

const routes = express.Router();
routes.use(express.json());


routes.get("/", getAllMerchantStatus);

routes.get("/:id", getMerchantStatusById);

routes.post("/", createMerchantStatus);

routes.patch("/:id", updateMerchantStatus);

routes.delete("/:id", deleteMerchantStatus);


export default routes;