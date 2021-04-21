const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductRateSchema = new Schema ({
    comment: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        default: 5
    },
    
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    new: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model("ProductRate", ProductRateSchema)