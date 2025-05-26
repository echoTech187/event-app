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
        required: true,
        unique: true
    },
    merchantPhone: {
        type: String,
        required: true,
        unique: true
    },
    merchantEmail: {
        type: String,
        required: true,
        unique: true
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
    merchaneNameOwner: {
        type: String,
        required: false
    },
    merchantEmailOwner: {
        type: String,
        required: false
    },
    merchantPhoneOwner: {
        type: String,
        required: false
    },
    merchantAddressOwner: {
        type: String,
        required: false
    },
    merchantProvinceOwner: {
        type: String,
        ref: 'Province',
        required: false
    },
    merchantCityOwner: {
        type: String,
        ref: 'City',
        required: false
    },
    merchantStateOwner: {
        type: String,
        ref: 'State',
        required: false
    },
    merchantCountryOwner: {
        type: String,
        ref: 'Country',
        required: false
    },
    merchantNIKOwner: {
        type: Number,
        required: false,
        unique: true
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
    }
});

export default mongoose.model('Merchant', merchantSchema);