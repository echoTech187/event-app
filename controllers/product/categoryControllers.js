import kategoryServices from "../../services/product/kategoryServices.js";
import * as libs from "../../utils/util.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllCategories = async (req, res) => {
    try {
        const params = await libs.generateParams(req);
        req.body = params;
        const response = await kategoryServices.getAllCategories(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Categories" });
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Categories Fetched Successfully", data: response });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Categories" });
    }

}

export const getCategoryById = async (req, res) => {
    try {
        const response = await kategoryServices.getCategoryById(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Category" });
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Category Fetched Successfully", data: response });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to get Category" });
    }
}

export const createCategory = async (req, res) => {
    console.log(req.body);
    try {
        const id = uuidv4();
        req.body.kategoryId = id;
        const response = await kategoryServices.createCategory(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Category" });
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Category Created Successfully" });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Category" });
    }
}

export const updateCategory = async (req, res) => {
    try {
        const response = await kategoryServices.updateCategory(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Category" });
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Category Updated Successfully" });
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Category" });
    }

}

export const deleteCategory = async (req, res) => {
    try {
        const response = await kategoryServices.deleteCategory(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Category" });
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "Category Deleted Successfully" });
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Category" });
    }
}

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };