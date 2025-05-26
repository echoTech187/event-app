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
    thumbnailImages: {
        type: String,
        ref: 'ImageThumbnail',
        required: true
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
        required: true
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