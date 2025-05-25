import * as userStatusServices from '../../../services/master/status/userStatusServices.js';
import * as libs from '../../../utils/util.js';
import { v4 as uuidv4 } from 'uuid';
export const getAllUserStatus = async (req, res) => {
    const params = await libs.generateParams(req);
    const userStatus = await userStatusServices.getAllUserStatus(params);
    return res.status(200).json({ responseCode: 200, status: "success", message: "User Status Fetched Successfully", data: userStatus });
};

export const getUserStatusById = async (req, res) => {
    const params = await libs.generateParams(req);
    const userStatus = await userStatusServices.getUserStatusById({ id: req.params.id, ...params });
    return res.status(200).json({ responseCode: 200, status: "success", message: "User Status Fetched Successfully", data: userStatus });
};

export const createUserStatus = async (req, res) => {

    const userStatus = await userStatusServices.getAllUserStatus({ status: req.body.status });
    if (userStatus.length > 0) return res.status(400).json({ responseCode: 400, status: "error", message: "User Status already exists" });
    const userCreated = await libs.decodeToken(req);
    const body = Object.assign(req.body, { statusId: uuidv4(), createdBy: userCreated.data.username });
    const response = await userStatusServices.createUserStatus(body);

    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create User Status" });
    } else {
        return res.status(200).json({ responseCode: 200, status: "success", message: "User Status Created Successfully" });
    }
};

export const updateUserStatus = async (req, res) => {
    const userCreated = await libs.decodeToken(req);
    const body = Object.assign(req.body, { active: true, updatedBy: userCreated.data.username, updatedAt: new Date() });
    const response = await userStatusServices.updateUserStatus({ statusId: req.params.id }, body);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update User Status" });
    } else {
        return res.status(200).json({ responseCode: 200, status: "success", message: "User Status Updated Successfully" });
    }

};

export const deleteUserStatus = async (req, res) => {
    const userCreated = await libs.decodeToken(req);
    const body = Object.assign({ active: false, deletedBy: userCreated.data.username, deletedAt: new Date() });
    const response = await userStatusServices.deleteUserStatus({ statusId: req.params.id }, body);
    if (!response) {
        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete User Status" });
    } else {
        return res.status(200).json({ responseCode: 200, status: "success", message: "User Status Deleted Successfully" });
    }
};

export default { getAllUserStatus, getUserStatusById, createUserStatus, updateUserStatus, deleteUserStatus };