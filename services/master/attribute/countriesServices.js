import countyModel from "../../../models/master/attribute/countyModel.js";
import { v4 as uuidv4 } from 'uuid';

export const getAllCountries = async (req, res) => {
    const response = await countyModel.find({ active: true });
    return response;
}

export const getAllCountriesByStateId = async (req, res) => {
    const response = await countyModel.find({ stateId: req.params.id, active: true });
    return response;
}

export const getCountryById = async (req, res) => {
    const response = await countyModel.findOne({ countryId: req.params.id, active: true });
    return response;
}

export const createCountry = async (req, res) => {
    const id = uuidv4();
    req.body.countryId = id;
    const response = await countyModel.create(req.body);
    return response;
}


export const updateCountry = async (req, res) => {
    const response = await countyModel.updateOne({ "countryId": req.params.id }, req.body);
    return response;
}

export const deleteCountry = async (req, res) => {
    const response = await countyModel.updateOne({ "countryId": req.params.id }, { active: false, deletedAt: new Date() });
    return response;
}


export default { getAllCountries, getAllCountriesByStateId, getCountryById, createCountry, updateCountry, deleteCountry };