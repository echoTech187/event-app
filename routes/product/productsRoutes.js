import express from "express";
import mv from "mv";
import fs from 'fs';
import path from 'path';
import md5 from 'md5';
import File from "../../models/products/imageModel.js";
import { getAllProducts, searchProduct, getProductById, createProduct, updateProduct, deleteProduct } from "../../controllers/product/productControllers.js";
const routes = express.Router();
routes.use(express.json());
const __dirname = path.resolve();

routes.get("/", getAllProducts);

routes.get("/:id", getProductById);

routes.post("/", async (req, res) => {

    const oldpath = req.files.productCoverImage.path;
    const ext = path.extname(req.files.productCoverImage.name);
    const filename = req.files.productCoverImage.name.split('.')[0];
    const filenameNew = md5(filename) + ext;
    const newpath = path.join(__dirname + "/public/images/products/" + req.fields.merchantId + "/" + filenameNew);
    mv(oldpath, newpath, { mkdirp: true }, function (err) {
        if (err) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to upload the Product" });
        const file = new File({
            name: filenameNew,
            data: fs.readFileSync(newpath),
            contentType: req.files.productCoverImage.type
        });
        req.body = { ...req.fields, productCoverImage: file };
        const postData = createProduct(req, res);
        if (!postData) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Product" });
        return postData;
    });
});

routes.patch("/:id", updateProduct);

routes.delete("/:id", deleteProduct);


export default routes;