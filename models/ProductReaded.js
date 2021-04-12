const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductReadedSchema = new Schema ({
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

module.exports = mongoose.model("ProductReaded", ProductReadedSchema)