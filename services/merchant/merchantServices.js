import merchantModel from "../../models/merchant/merchantModel.js";
import db from "../../connection.js";

export const getAllMerchants = async (req, res) => {
    const response = await db.connection.db.collection('merchants').aggregate([
        {
            $lookup: {
                as: "merchant_province",
                from: "provinces",
                foreignField: "provinceId",
                localField: "merchantProvince"
            }
        },
        {
            $lookup: {
                as: "merchantcities",
                from: "cities",
                foreignField: "cityId",
                localField: "merchantCity"
            }
        },
        {
            $lookup: {
                as: "merchantstate",
                from: "states",
                foreignField: "stateId",
                localField: "merchantState"
            }
        },
        {
            $lookup: {
                as: "merchantcountry",
                from: "countries",
                foreignField: "countryId",
                localField: "merchantcountry"
            }
        },
        {
            $lookup: {
                as: "merchanttype",
                from: "merchantstatuses",
                foreignField: "statusId",
                localField: "merchantStatus"
            }
        },
        {
            $match: {
                "deletedAt": null
            }
        },
        {
            $project: {
                merchantActive: 1,
                merchantAddress: 1,
                merchantCity: 1,
                merchantCreatedAt: 1,
                merchantEmail: 1,
                merchantId: 1,
                merchantLastActivity: 1,
                merchantName: 1,
                merchantPhone: 1,
                "merchant_province.provinceName": 1,
                "merchantcities.cityName": 1,
                "merchantstate.stateName": 1,
                "merchantcountry.countryName": 1,
                "merchanttype.status": 1
            }
        },
        {
            $sort: {
                merchantCreatedAt: 1
            }
        },
        {
            $group: {
                _id: {
                    merchantActive: "$merchantActive",
                    merchantAddress: "$merchantAddress",
                    merchantCity: "$merchantCity",
                    merchantCreatedAt: "$merchantCreatedAt",
                    merchantEmail: "$merchantEmail",
                    merchantId: "$merchantId",
                    merchantLastActivity:
                        "$merchantLastActivity",
                    merchantName: "$merchantName",
                    merchantPhone: "$merchantPhone",
                    merchant_province_provinceName:
                        "$merchant_province.provinceName",
                    merchantcities_cityName:
                        "$merchantcities.cityName",
                    merchantstate_stateName: "$mechantstate_stateName",
                    merchantcountry_countryName: "$merchantcountry_countryName",
                    merchanttype_status:
                        "$merchanttype.status"
                },
                stdDevPop_merchant_province_provinceName: {
                    $stdDevPop:
                        "$merchant_province.provinceName"
                }
            }
        }
    ]).toArray();
    return response[0]._id;
};

export const getMerchantById = async (req, res) => {
    const response = await db.connection.db.collection('merchants').aggregate([
        {
            $lookup: {
                as: "merchant_province",
                from: "provinces",
                foreignField: "provinceId",
                localField: "merchantProvince"
            }
        },
        {
            $lookup: {
                as: "merchantcities",
                from: "cities",
                foreignField: "cityId",
                localField: "merchantCity"
            }
        },
        {
            $lookup: {
                as: "merchantstate",
                from: "states",
                foreignField: "stateId",
                localField: "merchantState"
            }
        },
        {
            $lookup: {
                as: "merchantcountry",
                from: "countries",
                foreignField: "countryId",
                localField: "merchantcountry"
            }
        },
        {
            $lookup: {
                as: "merchanttype",
                from: "merchantstatuses",
                foreignField: "statusId",
                localField: "merchantStatus"
            }
        },
        {
            $match: {
                "active": true,
                "deletedAt": null,
                "merchantId": req.params.id
            }
        },
        {
            $project: {
                merchantActive: 1,
                merchantAddress: 1,
                merchantCity: 1,
                merchantCreatedAt: 1,
                merchantEmail: 1,
                merchantId: 1,
                merchantLastActivity: 1,
                merchantName: 1,
                merchantPhone: 1,
                "merchant_province.provinceName": 1,
                "merchantcities.cityName": 1,
                "merchantstate.stateName": 1,
                "merchantcountry.countryName": 1,
                "merchanttype.status": 1
            }
        },
        {
            $sort: {
                merchantCreatedAt: 1
            }
        },
        {
            $group: {
                _id: {
                    merchantActive: "$merchantActive",
                    merchantAddress: "$merchantAddress",
                    merchantCity: "$merchantCity",
                    merchantCreatedAt: "$merchantCreatedAt",
                    merchantEmail: "$merchantEmail",
                    merchantId: "$merchantId",
                    merchantLastActivity:
                        "$merchantLastActivity",
                    merchantName: "$merchantName",
                    merchantPhone: "$merchantPhone",
                    merchant_province_provinceName:
                        "$merchant_province.provinceName",
                    merchantcities_cityName:
                        "$merchantcities.cityName",
                    merchantstate_stateName: "$mechantstate_stateName",
                    merchantcountry_countryName: "$merchantcountry_countryName",
                    merchanttype_status:
                        "$merchanttype.status"
                },
                stdDevPop_merchant_province_provinceName: {
                    $stdDevPop:
                        "$merchant_province.provinceName"
                }
            }
        }
    ]).toArray();
    return response;
};

export const createMerchant = async (req, res) => {
    const response = await merchantModel.create(req.body);
    return response;
};

export const updateMerchant = async (req, res) => {
    const response = await merchantModel.updateOne({ merchantId: req.params.id }, req.body);
    return response;
};

export const deleteMerchant = async (req, res) => {
    const response = await merchantModel.updateOne({ merchantId: req.params.id }, { merchantActive: false, merchantDeletedAt: new Date() });
    return response;
};

export default { getAllMerchants, getMerchantById, createMerchant, updateMerchant, deleteMerchant };