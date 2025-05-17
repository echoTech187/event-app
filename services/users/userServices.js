import userActivityControllers from '../users/userActivityServices.js';
import User from '../../models/users/userModel.js';
import userActivityServices from '../users/userActivityServices.js';
/**
 * @function getAllUsers
 * @description Get all users
 * @param {Object} query - Optional query object with search parameters
 * @param {Number} query.limit - Optional limit of records to be returned
 * @param {Number} query.start - Optional start record number
 * @param {String} query.email - Optional email to be searched
 * @param {String} query.username - Optional username to be searched
 * @param {String} query.firstName - Optional first name to be searched
 * @param {String} query.lastName - Optional last name to be searched
 * @returns {Promise<Array>} - A promise that resolves to an array of user objects
 */
export const getAllUsers = async (query) => {
    const limit = !query.limit ? 0 : query.limit;
    const skip = !query.start ? 0 : parseInt(query.limit) * parseInt(query.start);
    const params = {};
    if (query) {
        delete query.limit;
        delete query.start;
        Object.assign(params, { isDeleted: false, ...query });
    }
    const users = await User.find(params).limit(limit).skip(skip);
    return users;
}
/**
 * @function searchUser
 * @description Search user
 * @param {Object} queryParams - Required query object with search parameters
 * @param {String} queryParams.email - Optional email to be searched
 * @param {String} queryParams.username - Optional username to be searched
 * @param {String} queryParams.firstName - Optional first name to be searched
 * @param {String} queryParams.lastName - Optional last name to be searched
 * @returns {Promise<Object>} - A promise that resolves to a user object
 */
export const searchUser = async (queryParams) => {
    const users = await User.findOne(queryParams);
    return users;
}

/**
 * @function getUserById
 * @description Get a user by id
 * @param {Object} queryParams - Required query object with search parameters
 * @param {String} queryParams.id - Required id of the user to be searched
 * @returns {Promise<Object>} - A promise that resolves to a user object
 */
export const getUserById = async (queryParams) => {
    const user = await User.findOne(queryParams);
    return user;
}

/**
 * @function createUser
 * @description Create a new user
 * @param {Object} user - Required user object to be created
 * @returns {Promise<Object>} - A promise that resolves to the created user object
 */
export const createUser = async (user) => {
    const createdUser = await User.create(user);
    return createdUser;
}

/**
 * @function updateUser
 * @description Update a user
 * @param {String} id - Required id of the user to be updated
 * @param {Object} body - Required user object with the updated fields
 * @returns {Promise<Object>} - A promise that resolves to the updated user object
 */
export const updateUser = async (id, body) => {
    const updatedUser = await User.updateOne({ id: id }, body);
    return updatedUser;
}

/**
 * @function deleteUser
 * @description Delete a user
 * @param {String} id - Required id of the user to be deleted
 * @returns {Promise<Object>} - A promise that resolves to the deleted user object
 */
export const deleteUser = async (id) => {
    const deletedUser = await User.updateOne({ id: id }, { isDeleted: true, lastDeleted: Date.now(), token: null });
    return deletedUser;
}


export default { getAllUsers, searchUser, getUserById, createUser, updateUser, deleteUser };