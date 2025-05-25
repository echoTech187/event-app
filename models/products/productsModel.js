import mongoose, { Schema } from "mongoose";
const productSchema = new mongoose.Schema({
    productId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    merchantId: [{
        type: Schema.Types.ObjectId,
        ref: 'Merchant',
        required: true
    }],
    name: {
        type: String,
        required: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }],
    brand: [{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    }],
    condition: [{
        type: Schema.Types.ObjectId,
        ref: 'Condition',
        required: true
    }],
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
    thumbnailImages: [{
        type: Schema.Types.ObjectId,
        ref: 'ImageThumbnail',
        required: true
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    productStatus: [{
        type: Schema.Types.ObjectId,
        ref: 'ProductStatus',
        required: true
    }]
});

export default mongoose.model('Product', productSchema);