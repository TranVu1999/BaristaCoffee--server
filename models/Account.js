const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: {
        type: String,
        uniquire: true,
        require: true,
        maxLength: 50
    },

    password: {
        type: String,
        uniquire: true
    },

    coin: {
        type: Number
    },

    typeAccount: {
        type: String,
        enum: ["admin", "guest", "owner"],
        default: "guest"
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