import productsModel from "../../models/products/productsModel.js";
import { generateParams } from "../../utils/util.js";

export const getAllProducts = async (req, res) => {
    const products = await productsModel.find({ "published": true, "deletedAt": null });
    return products;
}

export const getProductById = async (req, res) => {
    const product = await productsModel.findById(req.params.id, { "published": true, "deletedAt": null });
    return product;
}

export const searchProduct = async (req, res) => {
    const params = await generateParams(req);
    params["published"] = true;
    params["deletedAt"] = null;
    const product = await productsModel.find(params);
    return product;
}
export const createProduct = async (req, res) => {
    const product = await productsModel.create(req.body);
    return product;
}

export const updateProduct = async (req, res) => {
    const product = await productsModel.updateOne({ productId: req.params.id }, req.body);
    return product;
}

export const deleteProduct = async (req, res) => {
    const product = await productsModel.updateOne({ productId: req.params.id }, { active: false, deletedAt: new Date() });
    return product;
}

export default { getAllProducts, searchProduct, getProductById, createProduct, updateProduct, deleteProduct }