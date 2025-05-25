import merchantServices from "../../../services/merchant/merchantServices.js";
import { v4 as uuidv4 } from 'uuid';
import libs from "../../../utils/util.js";
export const getAllMerchants = async (req, res) => {
    const response = await merchantServices.getAllMerchants(req, res);
    res.status(200).json({ responseCode: 200, status: "success", message: "Merchants Fetched Successfully", data: response });
};

export const getMerchantById = async (req, res) => {
    const response = await merchantServices.getMerchantById(req, res);
    res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Fetched Successfully", data: response });
};

export const createMerchant = async (req, res) => {
    const id = uuidv4();
    req.body.merchantId = id;
    req.body.merchantPassword = await libs.hashPassword(req.body.merchantPassword);
    const response = await merchantServices.createMerchant(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Merchant" });
    }
    return res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Created Successfully" });
};

export const updateMerchant = async (req, res) => {
    const response = await merchantServices.updateMerchant(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Merchant" });
    }
    return res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Updated Successfully" });
};

export const deleteMerchant = async (req, res) => {
    const response = await merchantServices.deleteMerchant(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Merchant" });
    }
    return res.status(200).json({ responseCode: 200, status: "success", message: "Merchant Deleted Successfully" });
};

export default { getAllMerchants, getMerchantById, createMerchant, updateMerchant, deleteMerchant };