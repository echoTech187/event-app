import categoriesModel from "../../models/products/kategoryModel.js";
import db from "../../connection.js";

export const getAllCategories = async (req, res) => {
    const response = await db.connection.db.collection('categories').aggregate([
        {
            $match: { "active": true, "deletedAt": null }
        },
        {
            $project: {
                "categoryId": 1,
                "categoryName": 1,
                "categoryCode": 1
            }
        }
    ]).toArray();
    return response;
}

export const getCategoryById = async (req, res) => {
    const response = await db.connection.db.collection('categories').aggregate([
        {
            $match: { "active": true, "deletedAt": null, "categoryId": req.params.id }
        },
        {
            $project: {
                "categoryId": 1,
                "categoryName": 1,
                "categoryCode": 1
            }
        }
    ]).toArray();
    return response;
}

export const createCategory = async (req, res) => {
    const response = await categoriesModel.create(req.body);
    return response;
}

export const updateCategory = async (req, res) => {
    const response = await categoriesModel.updateOne({ "kategoryId": req.params.id }, req.body);
    return response;
}

export const deleteCategory = async (req, res) => {
    const response = await categoriesModel.updateOne({ "kategoryId": req.params.id }, { active: false, deletedAt: new Date() });
    return response;
}

export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };