const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductRateSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 0
    },
    
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    toUser: {
        type: String
    },

    author: {
        type: String
    },

    new: {
        type: Boolean,
        default: true
    },

    createdDate: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        unique: Boolean
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

module.exports = mongoose.model("ProductRate", ProductRateSchema)