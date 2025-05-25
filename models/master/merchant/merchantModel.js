import mongoose, { Schema } from "mongoose";
const merchantSchema = new mongoose.Schema({
    merchantId: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    merchantName: {
        type: String,
        required: true
    },
    merchantPhone: {
        type: String,
        required: true
    },
    merchantEmail: {
        type: String,
        required: true
    },
    merchantPassword: {
        type: String,
        required: true
    },
    merchantAddress: {
        type: String,
        required: true
    },
    merchantProvince: {
        type: String,
        ref: 'Province',
        required: true
    },
    merchantCity: {
        type: String,
        ref: 'City',
        required: true
    },
    merchantState: {
        type: String,
        ref: 'State',
        required: false
    },
    merchantCountry: {
        type: String,
        ref: 'Country',
        required: false
    },
    merchantZip: {
        type: String,
        required: false
    },
    merchantWebsite: {
        type: String,
        required: false
    },
    merchantLogo: {
        type: String,
        required: false
    },
    merchantDescription: {
        type: String,
        required: false
    },
    merchantCreatedAt: {
        type: Date,
        default: Date.now
    },
    merchantDeletedBy: {
        type: String,
        required: false,
        default: null
    },
    merchantDeletedAt: {
        type: Date,
        required: false,
        default: null
    },
    merchantStatus: {
        type: String,
        ref: 'MerchantStatus',
        required: true
    },
    merchantVerifiedBy: {
        type: String,
        required: false,
        default: null
    },
    merchantVerifiedAt: {
        type: Date,
        required: false,
        default: null
    },
    merchantActive: {
        type: Boolean,
        required: true,
        default: true
    },
    merchantLastActivity: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model('Merchant', merchantSchema);