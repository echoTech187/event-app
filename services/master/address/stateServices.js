import stateModel from "../../../models/master/address/stateModel.js";
import { v4 as uuidv4 } from 'uuid';
import db from "../../../connection.js";

export const getAllStates = async (req, res) => {
    const response = await db.connection.db.collection('states').aggregate([
        {
            $match: { "active": true, "deletedAt": null }
        },
        {
            $project: {
                "stateId": 1,
                "stateName": 1,
                "stateCode": 1
            }
        }
    ]).toArray();
    return response;
}

export const getStateById = async (req, res) => {
    const response = await db.connection.db.collection('states').aggregate([
        {
            $match: { "active": true, "deletedAt": null, "stateId": req.params.id }
        },
        {
            $project: {
                "stateId": 1,
                "stateName": 1,
                "stateCode": 1
            }
        }
    ]).toArray();
    return response;
}

export const getStatesByCityId = async (req, res) => {
    const response = await db.connection.db.collection('states').aggregate([
        {
            $match: { "active": true, "deletedAt": null, "cityId": req.params.id }
        },
        {
            $project: {
                "stateId": 1,
                "stateName": 1,
                "stateCode": 1
            }
        }
    ]).toArray();
    return response;
}

export const createState = async (req, res) => {
    const id = uuidv4();
    req.body.stateId = id;
    const response = await stateModel.create(req.body);
    return response;
}


export const updateState = async (req, res) => {
    const response = await stateModel.updateOne({ "stateId": req.params.id }, req.body);
    return response;
}

export const deleteState = async (req, res) => {
    const response = await stateModel.updateOne({ "stateId": req.params.id }, { active: false, deletedAt: new Date() });
    return response;
}

export default { getAllStates, getStateById, getStatesByCityId, createState, updateState, deleteState };

