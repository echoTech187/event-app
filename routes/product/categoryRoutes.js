import express from "express";
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from "../../controllers/product/categoryControllers.js";
const routes = express.Router();
routes.use(express.json());


routes.get("/", getAllCategories);

routes.get("/:id", getCategoryById);

routes.post("/", createCategory);

routes.patch("/:id", updateCategory);

routes.delete("/:id", deleteCategory);


export default routes;