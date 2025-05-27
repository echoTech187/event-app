import productServices from "../../services/product/productServices.js";
import { v4 as uuidv4 } from 'uuid';
import * as libs from "../../utils/util.js";

export const getAllProducts = async (req, res) => {
    try {
        const response = await productServices.getAllProducts(req, res);
        return res.status(200).json({ responseCode: 200, status: "success", message: "Products Fetched Successfully", data: response });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Products" })
    }
}

export const getProductById = async (req, res) => {
    try {
        const response = await productServices.getProductById(req, res);
        return res.status(200).json({ responseCode: 200, status: "success", message: "Product Fetched Successfully", data: response });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Product" })
    }

}

export const createProduct = async (req, res) => {
    try {
        const id = uuidv4();
        // const { name, data, contentType } = req.body.productCoverImage;
        req.body.productId = id;
        const response = await productServices.createProduct(req, res);

        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Product" })
        }
        const productCoverImage = req.body.productCoverImage;
        productCoverImage.productId = id;
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
    console.log(req);
    try {
        const response = await productServices.searchProduct(req, res);
        return res.status(200).json({ responseCode: 200, status: "success", message: "Product Fetched Successfully", data: response });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to search Product" })
    }
}

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct, searchProduct }