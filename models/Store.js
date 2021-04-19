const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreSchema = new Schema({
    brand: {
        type: String,
        required: true, 
        unique: true,
        maxLength: 30
    },

    alias: {
        type: String,
        required: true, 
        unique: true
    },

    logo: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
        required: true
    },

    coverImage: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    descriptionImage: {
        type: Array,
        default: []
    },

    New: {
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
    },
    
    score: {
        type: Number, 
        default: 0
    }
});

module.exports = mongoose.model("Store", StoreSchema)