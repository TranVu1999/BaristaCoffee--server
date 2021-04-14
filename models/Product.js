const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductCategorySchema = new Schema({
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
        type: Number
    },

    shortDescription: {
        type: String,
        require: true
    },

    detail: {
        type: String,
        required: true
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

    keyString: {
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

    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('ProductCategory', ProductCategorySchema)