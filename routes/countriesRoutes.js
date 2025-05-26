import express from "express";
import { getAllCountries, getCountryById, getAllCountriesByStateId, createCountry, updateCountry, deleteCountry } from "../controllers/master/address/countriesControllers.js";
const routes = express.Router();
routes.use(express.json());


routes.get("/", getAllCountries);

routes.get("/:id", getCountryById);

routes.get("/state/:id", getAllCountriesByStateId);

routes.post("/", createCountry);

routes.patch("/:id", updateCountry);

routes.delete("/:id", deleteCountry);


export default routes;

