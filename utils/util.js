import jwt from 'jsonwebtoken';
import config from './config.js';
import bcrypt from "bcrypt";
import authControllers from '../controllers/authentication/authControllers.js';

const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const checkValidToken = await authControllers.checkValidToken(token);

    if (!checkValidToken) return res.status(403).json({ responseCode: 403, status: "error", message: "unauthorized!" });

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.status(403).json({ responseCode: 403, status: "error", message: "unauthorized!" });
        next();
    });
};
export const getToken = async (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    return token;
}
export const decodeToken = async (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decodeToken = jwt.verify(token.toString(), config.jwtSecret);
    return decodeToken;
}
export const generateParams = async (req) => {
    const query = {};

    if (req.query) {
        Object.assign(query, req.query);
    }

    if (req.body) {
        Object.assign(query, req.body);
    }
    if (req.fields) {
        Object.assign(query, req.fields);
    }
    if (req.params) {
        Object.assign(query, req.params);
    }
    return query;
}

export const checkOldPassword = async (password, oldPassword) => {
    const isMatch = await comparePassword(password, oldPassword);
    return isMatch

}

export const generateToken = async (user) => {
    const token = jwt.sign({ data: user }, config.jwtSecret, { expiresIn: 604800 });
    return token;
}
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
export const comparePassword = async (password, hashedPassword) => {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export const logoutUser = async (user) => {
    const token = jwt.sign({ data: user }, config.jwtSecret, { expiresIn: 0 });
    return token;
}

export const generateString = async (length) => {
    const result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export default { generateToken, authenticateToken, getToken, generateParams, checkOldPassword, hashPassword, comparePassword, generateString, logoutUser };