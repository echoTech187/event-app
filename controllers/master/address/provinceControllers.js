import provinceServices from "../../../services/master/address/provinceServices.js";
import { v4 as uuidv4 } from "uuid";
export const getAllProvinces = async (req, res) => {
    const response = await provinceServices.getAllProvinces(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Provinces Fetched Successfully", data: response });
}

export const getProvinceById = async (req, res) => {
    const response = await provinceServices.getProvinceById(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Province Fetched Successfully", data: response });
}

export const createProvince = async (req, res) => {
    try {
        const id = uuidv4();
        req.body.provinceId = id;
        const response = await provinceServices.createProvince(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Province" });
        } else {
            res.status(200).json({ responseCode: 200, status: "success", message: "Province Created Successfully" });
        }
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Province" });
    }


}

export const updateProvince = async (req, res) => {
    try {
        const response = await provinceServices.updateProvince(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Province" });
        } else {
            return res.status(200).json({ responseCode: 200, status: "success", message: "Province Updated Successfully" });
        }
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Province" });
    }
}


export const deleteProvince = async (req, res) => {
    try {
        const response = await provinceServices.deleteProvince(req, res);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Province" });
        } else {
            return res.status(200).json({ responseCode: 200, status: "success", message: "Province Deleted Successfully" });
        }
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Province" });
    }
}

export default { getAllProvinces, getProvinceById, createProvince, updateProvince, deleteProvince };