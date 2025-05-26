import express from "express";
import mv from "mv";
import fs from 'fs';
import path from 'path';
import { getAllProducts, searchProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../../controllers/product/productControllers.js";
const routes = express.Router();
routes.use(express.json());
const __dirname = path.resolve();

routes.get("/", getAllProducts);

routes.get("/:id", getProductById);

routes.get("/search", searchProduct);

routes.post("/", async (req, res) => {
    const oldpath = req.files.productCoverImage.path;
    const newpath = path.join(__dirname + "/public/images/products/" + req.files.productCoverImage.name);

    mv(oldpath, newpath, function (err) {
        if (err) throw err.message;

        const file = {
            name: req.files.productCoverImage.name,
            data: fs.readFileSync(newpath),
            contentType: req.files.productCoverImage.type
        };
        req.body = { ...req.fields, ...req.body, productCoverImage: file };
        return createProduct(req, res);
    });
});

routes.patch("/:id", updateProduct);

routes.delete("/:id", deleteProduct);


export default routes;