import mongoose, { Schema } from "mongoose";
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
        required: true
    },
    productBrandId: {
        type: String,
        ref: 'Brand',
        required: true
    },
    productConditionId: {
        type: String,
        ref: 'Condition',
        required: true
    },
    productSKU: {
        type: String,
        required: true
    },
    productMinimumOrder: {
        type: Number,
        required: true
    },
    productWeightDimention: {
        type: Number,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    defaultImage: {
        type: String,
        required: true
    },
    thumbnailImages: {
        type: [String],
        ref: 'ImageThumbnail',
        required: true
    },
    productStatus: {
        type: String,
        ref: 'ProductStatus',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
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