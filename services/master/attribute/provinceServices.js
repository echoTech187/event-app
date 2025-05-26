import provinceModel from "../../../models/master/attribute/provinceModel.js";

export const getAllProvinces = async (req, res) => {
    return await provinceModel.find({ "active": true, "deletedAt": null });
}
export const getProvinceById = async (req, res) => {
    return await provinceModel.findOne({ "provinceId": req.params.id, "active": true, "deletedAt": null });
}
export const createProvince = async (req, res) => {
    return await provinceModel.create(req.body);
}

export const updateProvince = async (req, res) => {
    return await provinceModel.updateOne({ provinceId: req.params.id }, req.body);
}

export const deleteProvince = async (req, res) => {
    return await provinceModel.updateOne({ provinceId: req.params.id }, { active: false, deletedAt: new Date() });
}

export default {
    getAllProvinces,
    getProvinceById,
    createProvince,
    updateProvince,
    deleteProvince
}