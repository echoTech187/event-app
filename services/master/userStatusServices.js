import UserStatusModel from "../../models/master/userStatusModel.js";

export const getAllUserStatus = async (params) => {
    const userStatus = await UserStatusModel.find(params);
    return userStatus;
}

export const getUserStatusById = async (params) => {
    const userStatus = await UserStatusModel.findOne(params);
    return userStatus;
}

export const createUserStatus = async (params) => {
    const userStatus = await UserStatusModel.create(params);
    return userStatus;
}

export const updateUserStatus = async (params, body) => {
    const userStatus = await UserStatusModel.updateOne(params, body);
    return userStatus;
}

export const deleteUserStatus = async (params, body) => {
    const userStatus = await UserStatusModel.updateOne(params, body);
    return userStatus;
}

export default { getAllUserStatus, getUserStatusById, createUserStatus, updateUserStatus, deleteUserStatus };