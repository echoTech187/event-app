import merchantModel from "../../models/master/merchant/merchantModel.js";
import db from "../../connection.js";

export const getAllMerchants = async (req, res) => {
    const response = await db.connection.db.collection('merchants').aggregate([
        {
            $lookup: {
                from: "merchantstatuses",
                localField: "merchantStatus",
                foreignField: "statusId",
                as: "merchantStatusDetail",
                pipeline: [
                    {
                        $project: {
                            "statusId": 1,
                            "status": 1
                        }
                    }
                ]
            },
        },
        {
            $unwind: "$merchantStatusDetail"
        },
        {
            $lookup: {
                from: "provinces",
                localField: "merchantProvince",
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
            },
        },
        {
            $unwind: "$provinceDetail"

        },
        {
            $lookup: {
                from: "cities",
                localField: "merchantCity",
                foreignField: "cityId",
                as: "cityDetail",
                pipeline: [
                    {
                        $project: {
                            "cityId": 1,
                            "cityName": 1,
                            "cityCode": 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$cityDetail"
        },
        {
            $match: { "merchantActive": true, "merchantDeletedAt": null }
        },
        {
            $project: {
                "merchantId": 1,
                "merchantName": 1,
                "merchantPhone": 1,
                "merchantEmail": 1,
                "merchantAddress": 1,
                "merchantStatusDetail": 1,
                "provinceDetail": 1,
                "cityDetail": 1,
                "merchantVerifiedBy": 1,
                "merchantVerifiedAt": 1,
                "merchantLastActivity": 1,
                "merchantCreatedAt": 1,
                "merchantActive": 1
            }
        }
    ]).toArray();
    return response;
};

export const getMerchantById = async (req, res) => {
    const response = await db.connection.db.collection('merchants').aggregate([
        {
            $lookup: {
                from: "merchantstatuses",
                localField: "merchantStatus",
                foreignField: "statusId",
                as: "merchantStatusDetail",
                pipeline: [
                    {
                        $project: {
                            "statusId": 1,
                            "status": 1
                        }
                    }
                ]
            },
        },
        {
            $unwind: "$merchantStatusDetail"
        },
        {
            $lookup: {
                from: "provinces",
                localField: "merchantProvince",
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
            },
        },
        {
            $unwind: "$provinceDetail"

        },
        {
            $lookup: {
                from: "cities",
                localField: "merchantCity",
                foreignField: "cityId",
                as: "cityDetail",
                pipeline: [
                    {
                        $project: {
                            "cityId": 1,
                            "cityName": 1,
                            "cityCode": 1
                        }
                    }
                ]
            }
        },
        {
            $unwind: "$cityDetail"
        },
        {
            $match: { "merchantActive": true, "merchantDeletedAt": null, "merchantId": req.params.id }
        },
        {
            $project: {
                "merchantId": 1,
                "merchantName": 1,
                "merchantPhone": 1,
                "merchantEmail": 1,
                "merchantAddress": 1,
                "merchantStatusDetail": 1,
                "provinceDetail": 1,
                "cityDetail": 1,
                "merchantVerifiedBy": 1,
                "merchantVerifiedAt": 1,
                "merchantLastActivity": 1,
                "merchantCreatedAt": 1,
                "merchantActive": 1
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