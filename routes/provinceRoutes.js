import express from "express";
import { getAllProvinces, getProvinceById, createProvince, updateProvince, deleteProvince } from "../controllers/master/address/provinceControllers.js";
const routes = express.Router();
routes.use(express.json());


routes.get("/", getAllProvinces);

routes.get("/:id", getProvinceById);

routes.post("/", createProvince);

routes.patch("/:id", updateProvince);

routes.delete("/:id", deleteProvince);


export default routes;
