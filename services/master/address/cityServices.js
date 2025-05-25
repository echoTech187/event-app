import cityModel from "../../../models/master/address/cityModel.js";
import db from "../../../connection.js";

export const getAllCities = async (req, res) => {

    const response = await db.connection.db.collection('cities').aggregate([
        {
            $lookup: {
                from: "provinces",
                localField: "provinceId",
                foreignField: "provinceId",
                as: "provinceDetail",
                pipeline: [
                    {
                        $project: {
                            "provinceId": 1,
                            "provinceName": 1,
                            "provinceCode": 1
                        }
                    }
                ]

            }
        },
        {
            $unwind: "$provinceDetail"
        },
        {
            $match: { "active": true, "deletedAt": null }
        },
        {
            $project: {
                "cityId": 1,
                "cityName": 1,
                "cityCode": 1,
                "active": 1,
                "createdAt": 1,
                "provinceDetail.provinceId": 1,
                "provinceDetail.provinceName": 1,
                "provinceDetail.provinceCode": 1
            }
        }

    ]).toArray();
    return response;
}

export const getCityById = async (req, res) => {

    const response = await db.connection.db.collection('cities').aggregate([
        {
            $lookup: {
                from: "provinces",
                localField: "provinceId",
                foreignField: "provinceId",
                as: "provinceDetail",
                pipeline: [
                    {
                        $project: {
                            "provinceId": 1,
                            "provinceName": 1,
                            "provinceCode": 1
                        }
                    }
                ]

            }
        },
        {
            $unwind: "$provinceDetail"
        },
        {
            $match: { "active": true, "deletedAt": null, "cityId": req.params.id }
        },
        {
            $project: {
                "cityId": 1,
                "cityName": 1,
                "cityCode": 1,
                "active": 1,
                "createdAt": 1,
                "provinceDetail.provinceId": 1,
                "provinceDetail.provinceName": 1,
                "provinceDetail.provinceCode": 1
            }
        }

    ]).toArray();
    return response;
}

export const createCity = async (req, res) => {
    return await cityModel.create(req.body);
}

export const updateCity = async (req, res) => {
    return await cityModel.updateOne({ cityId: req.params.id }, req.body);
}

export const deleteCity = async (req, res) => {
    return await cityModel.updateOne({ cityId: req.params.id }, { active: false, deletedAt: new Date() });
}

export default {
    getAllCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
}