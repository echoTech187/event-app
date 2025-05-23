import UserServices from "../../services/users/userServices.js";
import * as libs from "../../utils/util.js";
import * as userActivityControllers from "../users/userActivityControllers.js";
import { v4 as uuidv4 } from 'uuid';
import { randomInt } from "crypto";
import { validate } from "deep-email-validator";
import { exit } from "process";

/**
 * @api {post} /auth/register Register
 * @apiName register
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Register
 * @apiParam {String} email Email.
 * @apiParam {String} password Password.
 * @apiParam {String} firstName First name.
 * @apiParam {String} lastName Last name.
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
 *       "message": "Failed to register user."
 *     }
 */
export const register = async (req, res) => {
    try {
        const { password, firstName, lastName, email } = req.body;
        req.body.password = await libs.hashPassword(password);
        req.body.username = firstName + lastName + randomInt(10, 9999);
        const id = uuidv4();
        const emailExists = await UserServices.searchUser({ email: email });
        if (emailExists) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "Email already exists. Please login!" });
        } else {
            const response = await UserServices.createUser({ ...req.body, id: id });
            if (!response) {
                return res.status(200).json({ responseCode: 200, status: "error", message: "Failed to register user." });
            } else {
                await userActivityControllers.addUserActivity(req, { id: id, username: req.body.username }, "REGISTER", { ...req.body });
                return res.status(201).json({ responseCode: 201, status: "success", message: "Successfully registered user." });
            }
        }

    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

/**
 * @api {post} /auth/login Login
 * @apiName login
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiDescription Login
 * @apiParam {String} email Email.
 * @apiParam {String} password Password.
 * @apiSuccess {Object} response Response object
 * @apiSuccess {Number} response.responseCode Response code
 * @apiSuccess {String} response.status Status
 * @apiSuccess {String} response.message Message
 * @apiSuccess {Object} response.data User session
 * @apiSuccess {String} response.data.id User id
 * @apiSuccess {String} response.data.username Username
 * @apiSuccess {String} response.data.firstName First name
 * @apiSuccess {String} response.data.lastName Last name
 * @apiSuccess {String} response.token Token
 * @apiError {Object} response Response object
 * @apiError {Number} response.responseCode Response code
 * @apiError {String} response.status Status
 * @apiError {String} response.message Message
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "responseCode": 500,
 *       "status": "error",
 *       "message": "Failed to login user."
 *     }
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validationResult = await validate(email);
        if (!validationResult.valid) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "Email is not valid. Please use a valid email!", error: validationResult.reason });
        } else {
            const user = await UserServices.searchUser({ email: email });
            
            if (!user) {
                return res.status(200).json({ responseCode: 200, status: "error", message: "Account not found. Please register!" });
            } else if (user.isDeleted) {
                if (user.token !== null) {
                    await UserServices.updateUser(user.id, { token: null });
                }

                return res.status(200).json({ responseCode: 200, status: "error", message: "Account has been deleted. Please contact customer support for more information." });
            } else if (user.isBlocked) {
                if (user.token !== null) {
                    await UserServices.updateUser(user.id, { token: null });
                }
                return res.status(200).json({ responseCode: 200, status: "error", message: "Account has been blocked. Please contact customer support for more information." });
            } else if (!user.password) {
                return res.status(200).json({ responseCode: 200, status: "error", message: "Password can't be empty." });
            } else if (!await libs.comparePassword(password, user.password)) {
                return res.status(200).json({ responseCode: 200, status: "error", message: "Password is wrong." });
            } else {
                const userSession = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                };
                const token = await libs.generateToken(userSession);
                if (!token) {
                    return res.status(200).json({ responseCode: 200, status: "error", message: "Login failed. Please try again." });
                } else {
                    const updatedUser = await UserServices.updateUser(user.id, { lastLogin: Date.now(), token: token });
                    
                    if (!updatedUser) {
                        return res.status(200).json({ responseCode: 200, status: "error", message: "Login failed. Please try again." });
                    } else {
                        
                        const response = await userActivityControllers.addUserActivity(req, userSession, "LOGIN", req.body);
                        if (!response) {
                            return res.status(200).json({ responseCode: 200, status: "error", message: "Login failed. Please try again." });
                        } else {
                            return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully logged in user.", data: userSession, token: token });
                        }

                    }

                }

            }
        }
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

/**
 * @function oAuthHandler
 * @description This API is used to login a user using the oAuth process.
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the user data and a JWT token
 */
export const oAuthHandler = async (req, res) => {
    try {
        const { email } = req.body;
        const validationResult = await validate(email);
        if (!validationResult.valid) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "Email is not valid. Please try again!", error: validationResult.reason });
        } else {
            const user = await UserServices.searchUser({ email: email });
            if (!user) {
                const response = await register(req, res);
                if (response.status === "success") {
                    const token = await libs.generateToken(user);
                    if (!token) {
                        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to generate token." });
                    } else {
                        const updatedUser = await UserServices.updateUser(user.id, { lastLogin: Date.now() });
                        if (!updatedUser) {
                            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update last login user." });
                        } else {
                            const userSession = {
                                id: user.id,
                                username: user.username,
                                firstName: user.firstName,
                                lastName: user.lastName
                            }
                            await userActivityControllers.addUserActivity(req, user, "LOGIN_OAUTH", req.body);
                            return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully logged in user.", data: userSession, token: token });
                        }
                    }
                } else {
                    return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to register user." });
                }
            } else {
                const token = await libs.generateToken(user);
                if (!token) {
                    return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to generate token." });
                } else {
                    const updatedUser = await UserServices.updateUser(user.id, { lastLogin: Date.now() });
                    if (!updatedUser) {
                        return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to update last login user." });
                    } else {
                        const userSession = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName
                        }
                        return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully logged in user.", data: userSession, token: token });
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

export const checkValidToken = async (token) => {
    try {
        const data = await UserServices.searchUser({ token: token });
        if (!data) {
            return false;
        } else {
            return true;
        }
    } catch (error) {
        return false;
    }
}
/**
 * @function refreshToken
 * @description Refreshes user token
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @returns {Promise<Response>} - A promise resolving to a Response object
 * @throws {Error} - If there is an error while refreshing token
 */
export const refreshToken = async (req, res) => {
    try {
        const user = await UserServices.searchUser({ id: req.body.id });
        if (!user) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "User not found." });
        } else {
            const token = await libs.generateToken(user);
            if (!token) {
                return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to generate token." });
            } else {
                const userSession = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.roleAccess
                }
                return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully refreshed token.", data: userSession, token: token });
            }
        }
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

/**
 * @function forgetPassword
 * @description This API is used to reset a user's password if they forget their old password
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the result of the password reset attempt
 */
export const forgetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        if (!email) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "Email is required." });
        } else {
            const validationResult = await validate(email);
            if (!validationResult.valid) {
                return res.status(200).json({ responseCode: 200, status: "error", message: "Email is not valid. Please try again!", error: validationResult.reason });
            } else {
                const user = await UserServices.searchUser({ email: email });
                if (!user) {
                    return res.status(200).json({ responseCode: 200, status: "error", message: "User not found." });
                } else if (!user.password) {
                    return res.status(200).json({ responseCode: 200, status: "error", message: "Password not found." });
                } else {
                    const matchPassword = await libs.checkOldPassword(newPassword, user.password);
                    if (matchPassword) {
                        return res.status(401).json({ responseCode: 401, status: "error", message: 'New password cannot be the same as the old password.' });
                    } else {
                        const password = await libs.hashPassword(newPassword);
                        if (!password) {
                            return res.status(500).json({ responseCode: 500, status: "error", message: "Failed to hash password." });
                        } else {
                            const response = await UserServices.updateUser(user.id, { password: password });
                            if (!response) {
                                return res.status(200).json({ responseCode: 200, status: "error", message: "Failed to update password." });
                            } else {
                                await userActivityControllers.addUserActivity(req, user, "FORGET_PASSWORD", req.body);
                                return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully updated password." });
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
}

/**
 * @function logout
 * @description This API is used to logout a user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Promise<Object>} - A promise that resolves to the response object containing the result of the logout attempt
 */
export const logout = async (req, res) => {
    try {
        const response = await UserServices.updateUser(req.body.id, { lastLogout: Date.now(), token: null });
        if (!response) {
            return res.status(200).json({ responseCode: 200, status: "error", message: "Failed to logout user." });
        } else {
            return res.status(200).json({ responseCode: 200, status: "success", message: "Successfully logged out user." });
        }
    } catch (error) {
        return res.status(500).json({ responseCode: 500, status: "error", message: error.message });
    }
};

export default { register, login, oAuthHandler, checkValidToken, refreshToken, forgetPassword, logout };