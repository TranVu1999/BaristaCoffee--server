const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserChema = new Schema({
    fullname: {
        type: String,
        maxLength: 50,
        required: true
    },

    phoneNumber: {
        type: String,
        maxLength: 15,
        required: true,
        default: ""
    },

    email: {
        type: String,
        maxLength: 50,
        required: true,
        default: ""
    },

    gender: {
        type: String,
        enum: ["male", "female"],
        default: "male"
    },

    birthday: {
        type: Date,
        default: Date.now
    },

    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }
})

module.exports = mongoose.model("User", UserChema)