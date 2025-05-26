import stateServices from "../../../services/master/attribute/stateServices.js";

export const getAllStates = async (req, res) => {
    const response = await stateServices.getAllStates(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "States Fetched Successfully", data: response });
}

export const getStateById = async (req, res) => {
    const response = await stateServices.getStateById(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "State Fetched Successfully", data: response });
}

export const getStatesByCityId = async (req, res) => {
    const response = await stateServices.getStatesByCityId(req, res);
    return res.status(200).json({ responseCode: 200, status: "success", message: "States Fetched Successfully", data: response });
}

export const createState = async (req, res) => {
    try {
        const response = await stateServices.createState(req, res);
        if (!response) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create State" });
        return res.status(200).json({ responseCode: 200, status: "success", message: "State Created Successfully", data: response });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create State" });
    }

}

export const updateState = async (req, res) => {
    try {
        const response = await stateServices.updateState(req, res);
        if (!response) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update State" });
        return res.status(200).json({ responseCode: 200, status: "success", message: "State Updated Successfully", data: response });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update State" });
    }
}

export const deleteState = async (req, res) => {
    try {
        const response = await stateServices.deleteState(req, res);
        if (!response) return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete State" });
        return res.status(200).json({ responseCode: 200, status: "success", message: "State Deleted Successfully", data: response });
    } catch (e) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete State" });
    }
}

export default { getAllStates, getStateById, getStatesByCityId, createState, updateState, deleteState };