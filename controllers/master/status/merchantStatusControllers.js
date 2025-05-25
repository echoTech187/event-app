import merchantStatusServices from "../../../services/master/status/merchantStatusServices.js";
import { v4 as uuidv4 } from "uuid";

export const getAllMerchantStatus = async (req, res) => {
    const response = await merchantStatusServices.getAllMerchantStatus(req, res);
    res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Status Fetched Successfully", data: userStatus });
};

export const getMerchantStatusById = async (req, res) => {
    const response = await merchantStatusServices.getMerchantStatusById(req, res);
    res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Status Fetched Successfully", data: response });
};

export const createMerchantStatus = async (req, res) => {
    const id = uuidv4();
    req.body.statusId = id;
    const response = await merchantStatusServices.createMerchantStatus(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Merchant Status" });
    } else {
        return res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Status Created Successfully" });
    }
};

export const updateMerchantStatus = async (req, res) => {
    const response = await merchantStatusServices.updateMerchantStatus(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Merchant Status" });
    } else {
        return res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Status Updated Successfully" });
    }
};

export const deleteMerchantStatus = async (req, res) => {
    const response = await merchantStatusServices.deleteMerchantStatus(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Merchant Status" });
    } else {
        return res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Status Deleted Successfully" });
    }
};

export default { getAllMerchantStatus, getMerchantStatusById, createMerchantStatus, updateMerchantStatus, deleteMerchantStatus };