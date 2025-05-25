import MerchantStatus from "../../../models/master/status/merchantStatusModel.js";
export const getAllMerchantStatus = async (req, res) => {
    const response = await MerchantStatus.find({ "active": true, "deletedAt": null }).sort({ "createdAt": 1 });
    return response;
};

export const getMerchantStatusById = async (req, res) => {
    const response = await MerchantStatus.findOne({ "statusId": req.params.id, active: true, deletedAt: null });
    return response;
};

export const createMerchantStatus = async (req, res) => {
    const response = await MerchantStatus.create(req.body);
    return response;
};

export const updateMerchantStatus = async (req, res) => {
    const response = await MerchantStatus.updateOne({ "statusId": req.params.id }, req.body);
    return response;
};

export const deleteMerchantStatus = async (req, res) => {
    const response = await MerchantStatus.updateOne({ "statusId": req.params.id }, { active: false, deletedAt: new Date() });
    return response;
};

export default { getAllMerchantStatus, getMerchantStatusById, createMerchantStatus, updateMerchantStatus, deleteMerchantStatus };