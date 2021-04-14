const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DiscountSchema = new Schema({
    code: {
        type: String,
        required: true
    },

    cost: {
        type: Number
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

module.exports = mongoose.model('Discount', DiscountSchema)