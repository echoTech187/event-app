import productsModel from "../../models/products/productsModel.js";
import db from "../../connection.js";
import * as libs from "../../utils/util.js";
export const getAllProducts = async (req, res) => {
    try {
        const params = await libs.generateParams(req);
        const products = await db.connection.db.collection('products').aggregate([
            {
                $lookup: {
                    as: "productmerchant",
                    from: "merchants",
                    foreignField: "merchantId",
                    localField: "merchantId"
                }
            },
            {
                $lookup: {
                    as: "productcover",
                    from: "files",
                    foreignField: "_id",
                    localField: "productCoverImage"
                }
            },
            {
                $match: {
                    published: true,
                    ...params
                }
            },
            {
                $project: {
                    createdAt: 1,
                    productDescription: 1,
                    productId: 1,
                    productMinimumOrder: 1,
                    productName: 1,
                    productNote: 1,
                    productSKU: 1,
                    productShortDescription: 1,
                    productWeight: 1,
                    merchantId: 1,
                    published: 1,
                    "imagecover": { "$arrayElemAt": ["$productcover.name", 0] },
                    "merchantName": { "$arrayElemAt": ["$productmerchant.merchantName", 0] },
                    "merchantStatus": { "$arrayElemAt": ["$productmerchant.merchantStatus", 0] },
                    "merchantCity": { "$arrayElemAt": ["$productmerchant.merchantCity", 0] },
                    "merchantProvince": { "$arrayElemAt": ["$productmerchant.merchantProvince", 0] }

                }
            },
            {
                $lookup: {
                    as: "province",
                    from: "provinces",
                    foreignField: "provinceId",
                    localField: "merchantProvince"
                }
            },
            {
                $lookup: {
                    as: "city",
                    from: "cities",
                    foreignField: "cityId",
                    localField: "merchantCity"
                }
            },
            {
                $lookup: {
                    as: "category",
                    from: "merchantstatuses",
                    foreignField: "statusId",
                    localField: "merchantStatus"
                }
            },
            {
                $project: {
                    createdAt: 1,
                    productDescription: 1,
                    productId: 1,
                    productMinimumOrder: 1,
                    productName: 1,
                    productNote: 1,
                    productSKU: 1,
                    productShortDescription: 1,
                    productWeight: 1,
                    merchantId: 1,
                    published: 1,
                    "imagecover": 1,
                    "merchantName": 1,
                    "merchants.merchantStatus": { "$arrayElemAt": ["$category.status", 0] },
                    "merchants.merchantProvince": { "$arrayElemAt": ["$province.provinceName", 0] },
                    "merchants.merchantCity": { "$arrayElemAt": ["$city.cityName", 0] },
                }
            }
        ]).toArray();
        return products;
    } catch (error) {
        console.log(error);
    }

}

export const getProductById = async (req, res) => {
    const product = await db.connection.db.collection('products').aggregate([
        {
            $lookup: {
                as: "productmerchant",
                from: "merchants",
                foreignField: "merchantId",
                localField: "merchantId"
            }
        },
        {
            $lookup: {
                as: "productcover",
                from: "files",
                foreignField: "_id",
                localField: "productCoverImage"
            }
        },
        {
            $match: {
                published: true,
                productId: req.params.productId
            }
        },
        {
            $project: {
                createdAt: 1,
                productDescription: 1,
                productId: 1,
                productMinimumOrder: 1,
                productName: 1,
                productNote: 1,
                productSKU: 1,
                productShortDescription: 1,
                productWeight: 1,
                "productcover.name": 1,
                "productmerchant.merchantName": 1,
                published: 1,
                "productmerchant.merchantStatus": 1,
                "productmerchant.merchantCity": 1,
                "productmerchant.merchantProvince": 1
            }
        }
    ]).toArray();
    return product[0];
}

export const searchProduct = async (req, res) => {

    const params = await generateParams(req);
    console.log(params);
    const product = await db.connection.db.collection('products').aggregate([
        {
            $lookup: {
                as: "productmerchant",
                from: "merchants",
                foreignField: "merchantId",
                localField: "merchantId"
            }
        },
        {
            $lookup: {
                as: "productcover",
                from: "files",
                foreignField: "_id",
                localField: "productCoverImage"
            }
        },
        {
            $match: {
                published: true,
                ...params
            }
        },

        {
            $project: {
                createdAt: 1,
                productDescription: 1,
                productId: 1,
                productMinimumOrder: 1,
                productName: 1,
                productNote: 1,
                productSKU: 1,
                productShortDescription: 1,
                productWeight: 1,
                "productcover.name": 1,
                "productmerchant.merchantName": 1,
                published: 1,
                "productmerchant.merchantStatus": 1,
                "productmerchant.merchantCity": 1,
                "productmerchant.merchantProvince": 1
            }
        }
    ]).toArray();
    return product;
}
export const createProduct = async (req, res) => {
    const product = await productsModel.create(req.body);
    return product;
}

export const updateProduct = async (req, res) => {
    const product = await productsModel.updateOne({ productId: req.params.id }, req.body);
    return product;
}

export const deleteProduct = async (req, res) => {
    const product = await productsModel.updateOne({ productId: req.params.id }, { active: false, deletedAt: new Date() });
    return product;
}

export default { getAllProducts, searchProduct, getProductById, createProduct, updateProduct, deleteProduct }