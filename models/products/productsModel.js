import mongoose, { Schema } from "mongoose";
import File from "../products/imageModel.js";
const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    merchantId: {
        type: String,
        ref: 'Merchant',
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productCategoryId: {
        type: String,
        ref: 'Category',
        required: false
    },
    productBrandId: {
        type: String,
        ref: 'Brand',
        required: false
    },
    productConditionId: {
        type: String,
        ref: 'Condition',
        required: false
    },
    productSKU: {
        type: String,
        required: true,
        unique: true
    },
    productCoverImage: {
        type: Schema.Types.ObjectId,
        ref: 'File',
        required: false
    },
    productMinimumOrder: {
        type: Number,
        required: true
    },
    productShortDescription: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productNote: {
        type: String,
        required: true
    },
    productWeight: {
        type: Number,
        required: true
    },
    published: {
        type: Boolean,
        required: true,
        default: true
    },
    productTypes: {
        type: String,
        ref: 'ProductTypes',
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: String,
        required: false,
        default: null
    },
    deletedBy: {
        type: String,
        required: false,
        default: null
    },
    deletedAt: {
        type: Date,
        required: false,
        default: null
    }
});

export default mongoose.model('Product', productSchema);