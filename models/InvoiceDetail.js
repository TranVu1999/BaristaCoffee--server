const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoicedetailSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },

    amount: {
        type: Number,
        default: 1
    },

    total: {
        type: Number,
        default: 0
    },
    
    invoiceId: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice' 
    }
});

module.exports = mongoose.model("InvoiceDetail", InvoicedetailSchema)