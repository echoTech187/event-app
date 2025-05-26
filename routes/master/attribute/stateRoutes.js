import express from "express";
import { getAllStates, getStateById, getStatesByCityId, createState, updateState, deleteState } from "../../../controllers/master/attribute/stateControllers.js";
const routes = express.Router();
routes.use(express.json());


routes.get("/", getAllStates);

routes.get("/:id", getStateById);

routes.get("/city/:id", getStatesByCityId);

routes.post("/", createState);

routes.patch("/:id", updateState);

routes.delete("/:id", deleteState);


export default routes;