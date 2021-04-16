const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSaleSchema = new Schema({
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

module.exports = mongoose.model('ProductSale', ProductSaleSchema)