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
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: String,
        ref: 'SubCategory',
        required: true
    },
    brand: {
        type: String,
        ref: 'Brand',
        required: true
    },
    condition: {
        type: String,
        ref: 'Condition',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    productStatus: {
        type: String,
        ref: 'ProductStatus',
        required: true
    }
});

export default mongoose.model('Product', productSchema);