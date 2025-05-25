import express from "express";
import { getAllCities, getCityById, createCity, updateCity, deleteCity } from "../controllers/master/address/cityControllers.js";
const routes = express.Router();
routes.use(express.json());

routes.get("/", getAllCities);

routes.get("/:id", getCityById);

routes.post("/", createCity);

routes.patch("/:id", updateCity);

routes.delete("/:id", deleteCity);

export default routes;