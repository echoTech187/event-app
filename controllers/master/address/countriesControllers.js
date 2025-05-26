import countriesServices from "../../../services/master/address/countriesServices.js";

export const getAllCountries = async (req, res) => {
    const response = await countriesServices.getAllCountries(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Countries Fetched Successfully", data: response });
}

export const getCountryById = async (req, res) => {
    const response = await countriesServices.getCountryById(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Country Fetched Successfully", data: response });
}

export const getAllCountriesByStateId = async (req, res) => {
    const response = await countriesServices.getAllCountriesByStateId(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "Countries Fetched Successfully", data: response });
}

export const createCountry = async (req, res) => {
    try {
        const response = await countriesServices.createCountry(req, res);
        if (!response) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Country" });
        return res.status(200).json({ responseCode: 200, status: "success", message: "Country Created Successfully" });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create Country" });
    }
}

export const updateCountry = async (req, res) => {
    try {
        const response = await countriesServices.updateCountry(req, res);
        if (!response) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Country" });
        return res.status(200).json({ responseCode: 200, status: "success", message: "Country Updated Successfully" });

    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update Country" });
    }
}

export const deleteCountry = async (req, res) => {
    try {
        const response = await countriesServices.deleteCountry(req, res);
        if (!response) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Country" });
        return res.status(200).json({ responseCode: 200, status: "success", message: "Country Deleted Successfully" });

    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete Country" });
    }
}

