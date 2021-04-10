const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductCategorySchema = new Schema({
    title: {
        type: String,
        maxLength: 50, 
        require: true,
        uniquire: true
    },

    alias: {
        type: String,
        maxLength: 60, 
        require: true,
        uniquire: true
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