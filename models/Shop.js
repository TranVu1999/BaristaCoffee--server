const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    brand: {
        type: String,
        require: true
    },

    coverImage: {
        type: String,
        require: true
    },

    name: {
        type: String,
        require: true,
        maxLength: 30
    },

    script: {
        type: Array
    },

    description: {
        type: String
    },

    isNew: {
        type: Boolean,
        default: true
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
});

module.exports = mongoose.model("Account", AccountSchema)