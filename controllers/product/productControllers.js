import productServices from "../../services/product/productServices.js";
import { v4 as uuidv4 } from 'uuid';
import File from "../../models/products/imageModel.js";


export const getAllProducts = async (req, res) => {
    try {
        const response = await productServices.getAllProducts(req, res);
        return response;
    } catch (e) {
        console.log(e);
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Products" })
    }
}

export const getProductById = async (req, res) => {
    const response = await productServices.getProductById(req, res);
    return response;
}

export const createProduct = async (req, res) => {
    try {
        const id = uuidv4();
        const { name, path, type } = req.files.productCoverImage;
        const productCoverImage = new File({
            name: name,
            data: path,
            contentType: type,
        });


        req.body = { ...req.fields, productCoverImage: productCoverImage };
        req.body.productId = id;

        const response = await productServices.createProduct(req, res);

        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Product" })
        }
        await productCoverImage.save();
        return res.status(200).json({ responseCode: 200, status: "success", message: "Product Created Successfully" })
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Product " })
    }
}


export const updateProduct = async (req, res) => {
    try {
        const response = await productServices.updateProduct(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Product" })
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Product Updated Successfully" })
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Product" })
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const response = await productServices.deleteProduct(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Product" })
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Product Deleted Successfully" })
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Product" })
    }
}

export const searchProduct = async (req, res) => {
    const response = await productServices.searchProduct(req, res);
    return response;
}

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProduct }