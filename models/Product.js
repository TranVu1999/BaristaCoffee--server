const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    avatar: {
        type: String,
        required: true
    },
    moreImage: {
        type: Array,
        reuired: true
    },
    title: {
        type: String,
        maxLength: 50, 
        required: true,
        unique: true
    },

    alias: {
        type: String,
        maxLength: 60, 
        required: true,
        unique: true
    },

    productCategoryId: {
        type: Schema.Types.ObjectId,
        ref: "ProductCategory"
    },

    rating: {
        type: Number,
        default: 0
    },

    price: {
        type: Number
    },

    promo: {
        type: Number,
        default: 0
    },

    shortDescription: {
        type: String,
        require: true
    },

    detail: {
        type: String,
        required: true
    },
    
    width: {
        type: Number,
        default: 1
    },

    height: {
        type: Number,
        default: 1
    },

    length: {
        type: Number,
        default: 1
    },

    weight: {
        type: Number,
        default: 1
    },

    sku: {
        type: String,
        required: true,
        maxLength: 20
    },

    view: {
        type: Number,
        default: 0
    },

    keySearch: {
        type: Array
    },

    createdDate: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },

    modifiedDate: {
        type: Date,
        default: Date.now
    },

    modifiedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },

    new: {
        type: Boolean,
        default: true
    },

    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Product', ProductSchema)