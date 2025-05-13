import userActivityServices from "../../services/users/userActivityServices.js";
import userActivityModel from "../../models/users/userActivityModel.js";
import { getToken } from "../../utils/util.js";
import jwt from "jsonwebtoken";
import config from "../../utils/config.js";

/**
 * @function addUserActivity
 * @description This API is used to add user activity in the database when any API is called.
 * @param {Object} req - Request object
 * @param {Object} data - Data to be stored in the activity collection
 * @param {String} title - Title of the activity
 * @param {Object} query - Query object
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the added activity data
 */
export const addUserActivity = async (req, data, title, query) => {
    const token = await getToken(req);
    if (!token) {
        const activity = await userActivityModel.create({
            userId: data.id,
            activity: title,
            query: JSON.stringify(query),
            userAction: data.username
        });

        return activity;
    } else {
        const decodeToken = jwt.verify(token.toString(), config.jwtSecret);
        const activity = await userActivityModel.create({
            userId: decodeToken.data.id,
            activity: title,
            query: JSON.stringify(query),
            userAction: decodeToken.data.username
        });

        return activity;
    }

};
/**
 * @function getAllUserActivity
 * @description Get all user activity and add it to the user data
 * @param {Object} req - Request object
 * @param {Array} userData - User data
 * @returns {Promise<Array<Object>>} - A promise that resolves to the response array containing the user data with its activity
 */
export const getAllUserActivity = async (req, userData) => {
    if (userData.length === 0) return [];
    
    for (let i = 0; i < userData.length; i++) {
        const user = userData[i];
        const activities = await userActivityServices.getAllUserActivity({ userId: user.id });
        if (activities.length > 0) {
            user.userActivity = activities.map(activity => ({
                activity: activity.activity,
                userAction: activity.userAction,
                createdAt: activity.createdAt
            }));
        }
    }
    return userData;
};

export default { addUserActivity, getAllUserActivity };