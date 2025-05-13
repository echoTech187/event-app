import userActivity from "../../models/users/userActivityModel.js";
/**
 * @function createUserActivity
 * @description Create a user activity
 * @param {Object} data - User activity data to be created
 * @returns {Promise<Object>} - A promise that resolves to the created user activity object
 */
export const createUserActivity = async (data) => {
    const activity = await userActivity.create(data);
    return activity;
}

/**
 * @function getAllUserActivity
 * @description Get all user activities
 * @param {Object} query - Query object to search user activities
 * @param {Number} limit - Optional limit of records to be returned, defaults to 0
 * @param {Number} skip - Optional skip number of records, defaults to 0
 * @returns {Promise<Array>} - A promise that resolves to an array of user activity objects
 */
export const getAllUserActivity = async (query, limit = 0, skip = 0) => {
    const activity = await userActivity.find(query).sort({ createdAt: -1 }).limit(limit).skip(skip);
    return activity;
}

export default { createUserActivity, getAllUserActivity }