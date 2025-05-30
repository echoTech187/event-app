import cityServices from "../../../services/master/attribute/cityServices.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllCities = async (req, res) => {
    const response = await cityServices.getAllCities(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Cities Fetched Successfully", data: response });
}

export const getCityById = async (req, res) => {
    const response = await cityServices.getCityById(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "City Fetched Successfully", data: response });
}

export const getAllCitiesByProvinceId = async (req, res) => {
    const response = await cityServices.getAllCitiesByProvinceId(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Cities Fetched Successfully", data: response });
}

export const createCity = async (req, res) => {
    try {
        const id = uuidv4();
        req.body.cityId = id;
        const response = await cityServices.createCity(req, res);
        print(typeof response);
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create City" });
        }
        return res.status(200).json({ responseCode: 200, status: "success", message: "City Created Successfully" });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create City" });
    }
}

export const updateCity = async (req, res) => {
    const response = await cityServices.updateCity(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update City" });
    }
    return res.status(200).json({ responseCode: 200, status: "success", message: "City Updated Successfully" });
}

export const deleteCity = async (req, res) => {
    const response = await cityServices.deleteCity(req, res);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete City" });
    }
    return res.status(200).json({ responseCode: 200, status: "success", message: "City Deleted Successfully" });
}

export default { getAllCities, getCityById, getAllCitiesByProvinceId, createCity, updateCity, deleteCity };