import express from "express";
import { getAllMerchants, getMerchantById, createMerchant, updateMerchant, deleteMerchant } from "../controllers/master/merchant/merchantControllers.js";
const routes = express.Router();
routes.use(express.json());


routes.get("/", getAllMerchants);

routes.get("/:id", getMerchantById);

routes.post("/", createMerchant);

routes.patch("/:id", updateMerchant);

routes.delete("/:id", deleteMerchant);


export default routes;
