import UserServices from "../../services/users/userServices.js";
import * as libs from "../../utils/util.js";
import * as userActivityControllers from "./userActivityControllers.js";
import { v4 as uuidv4 } from 'uuid';
import { randomInt } from "crypto";
import { checkOldPassword, generateParams } from "../../utils/util.js";
import { validate } from "deep-email-validator";



/**
 * @function getAllUsers
 * @description Get all users
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<Response>} - A promise resolving to a Response object
 * @throws {Error} - If there is an error while fetching users
 */
export const getAllUsers = async (req, res) => {
    try {
        const query = await generateParams(req);
        const users = await UserServices.getAllUsers(query);
        if (!users) {
            return res.status(200).json({ responseCode: 200, data: [], status: "success", rowTotal: 0, message: "Your request successfully fetched all users" });
        } else {
            Object.entries(users).map(async ([key, user]) => {
                Object.assign(user, { password: undefined, token: undefined,__v: undefined });
            })
            // await addUserActivity(req, users, "GET_ALL_USERS", query, true);
            const response = await userActivityControllers.getAllUserActivity(req, users);

            res.status(200).json({ responseCode: 200, data: response, status: "success", rowTotal: response.length, message: "Your request successfully fetched all users" });
        }
    } catch (error) {
        res.status(500).json({ responseCode: 500, status: "error", message: error.message, data: [], rowTotal: 0 });
    }
};

/**
 * @function getUser
 * @description This API is used to search a user using search parameters like email, username, id, etc.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} - A promise that resolves to the response object containing searched user data
 */
export const getUser = async (req, res) => {
    try {
        const search = await generateParams(req);
        const user = await UserServices.searchUser(search);
        if (!user) {
            return res.status(404).json({ responseCode: 404, data: [], status: "error", message: "User not found" });
        } else {
            Object.entries(user).forEach(async ([key, data]) => {
                Object.assign(data, {__v: undefined});
            })
            // const response = await addUserActivity(req, user, "SEARCH_USERS", query);
            res.status(200).json({ responseCode: 200, data: user, status: "success", message: "Your request successfully fetched by users" });
        }

    } catch (error) {
        res.status(500).json({ responseCode: 500, status: "error", message: error.message, data: [], rowTotal: 0 });
    }
}
/**
 * @function getUserById
 * @description This API is used to fetch a user by his/her id
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the user data
 */
export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const params = await generateParams(req);

        const user = await UserServices.getUserById({ ...req.params, ...params });

        if (!user) {
            return res.status(404).json({ responseCode: 404, data: [], status: "error", message: "User not found" });
        } else {
            const sanitizedUser = { ...user };
            delete sanitizedUser.__v;

            res.status(200).json({ responseCode: 200, data: sanitizedUser, status: "success", message: "User successfully fetched" });
        }

    } catch (error) {
        res.status(500).json({ responseCode: 500, status: "error", message: error.message, data: [], rowTotal: 0 });
    }
}

/**
 * @api {post} /users Create User
 * @apiName createUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Create user
 * @apiParam {String} firstName First name.
 * @apiParam {String} lastName Last name.
 * @apiParam {String} email Email.
 * @apiParam {String} password Password.
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.responseCode Response code
 * @apiSuccess {String} response.status Status
 * @apiSuccess {String} response.message Message
 * @apiError {Object} response Response object
 * @apiError {Number} response.responseCode Response code
 * @apiError {String} response.status Status
 * @apiError {String} response.message Message
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "responseCode": 500,
 *       "status": "error",
 *       "message": "Failed to create user."
 *     }
 */
export const createUser = async (req, res) => {
    try {
        const { password, firstName, lastName, email } = req.body;
        req.body.password = await libs.hashPassword(password);
        req.body.username = firstName + lastName + randomInt(10, 9999);
        const id = uuidv4();

        const validationResult = await validate(email);
        

        if (!validationResult.valid) {
            return res.status(400).json({ responseCode: 400, status: "error", message: "Email is not valid. Please try again!", error: validationResult.reason });
        }
        const emailExists = await UserServices.searchUser({ email: email });
        if (emailExists) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "Email already registered. Please try again!" });
        }

        const response = await UserServices.createUser({ ...req.body, id: id });
        if (!response) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create user." });
        } else {
            const addUserActivity = await userActivityControllers.addUserActivity(req, response, "CREATE_USERS", { ...req.body, id: id });
            if (!addUserActivity) {
                return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create user activity." });
            } else {
                return res.status(201).json({ responseCode: 201, status: "success", message: "Successfully created user." });
            }
        }
    } catch (error) {
        res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

/**
 * @api {patch} /users/:id Update User
 * @apiName updateUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Update user
 * @apiParam {String} id User id
 * @apiParam {String} firstName First name.
 * @apiParam {String} lastName Last name.
 * @apiParam {String} email Email.
 * @apiParam {String} password Password.
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.responseCode Response code
 * @apiSuccess {String} response.status Status
 * @apiSuccess {String} response.message Message
 * @apiError {Object} response Response object
 * @apiError {Number} response.responseCode Response code
 * @apiError {String} response.status Status
 * @apiError {String} response.message Message
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "responseCode": 500,
 *       "status": "error",
 *       "message": "Failed to update user."
 *     }
 */
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        if (!id) {
            return res.status(403).json({ responseCode: 403, status: "error", message: "ID not defined" });
        }
        const userData = await UserServices.getUserById({ email: req.body.email});
        if(!userData){
            return res.status(403).json({ responseCode: 403, status: "error", message: "User not found" });
        }else{
            const matchPassword = await checkOldPassword(req.body.password,userData.password );
            if (matchPassword) {
                delete req.body.password;
            } else {
                req.body.password = await libs.hashPassword(password);
            }
            const user = await UserServices.updateUser(id, req.body);
            if (!user) {
                return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update user." });
            } else {
                const addUserActivity = await userActivityControllers.addUserActivity(req, user, "UPDATE_USERS", { id: id, body: req.body });
                if (!addUserActivity) {
                    return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create user activity." });
                } else {
                    return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully updated user." });
                }
            }
        }
        

    } catch (error) {
        res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

/**
 * @api {delete} /users/:id Delete User
 * @apiName deleteUser
 * @apiGroup Users
 * @apiVersion 1.0.0
 * @apiDescription Delete user
 * @apiParam {String} id User id
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.responseCode Response code
 * @apiSuccess {String} response.status Status
 * @apiSuccess {String} response.message Message
 * @apiError {Object} response Response object
 * @apiError {Number} response.responseCode Response code
 * @apiError {String} response.status Status
 * @apiError {String} response.message Message
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "responseCode": 500,
 *       "status": "error",
 *       "message": "Failed to delete user."
 *     }
 */
export const deleteUser = async (req, res) => {
    try {

        const user = await UserServices.deleteUser(req.params.id);
        if (!user) {
            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to delete user." });
        } else {
            const addUserActivity = await userActivityControllers.addUserActivity(req, user, "DELETE_USERS", { id: req.params.id });
            if (!addUserActivity) {
                return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to create user activity." });
            } else {
                return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully deleted user." });
            }
        }

    } catch (error) {
        res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

export default { getAllUsers, getUser, getUserById, createUser, updateUser, deleteUser };