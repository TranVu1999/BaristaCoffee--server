const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserNotifySchema = new Schema({
    typeNotify: {
        type: String,
        enum: ["invoice", "system", "promotion"]
    },

    isNew: {
        type: Boolean,
        default: true
    },

    toAccount: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },

    content: {
        type: String,
        maxLength: 500
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

module.exports = mongoose.model("UserNotify", UserNotifySchema)