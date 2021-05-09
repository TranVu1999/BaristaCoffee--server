const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema ({
    fullname: {
        type: String,
        maxLength: 50,
        required: true
    },

    company: {
        type: String,
        maxLength: 50
    },

    province: {
        type: String,
        maxLength: 50,
        required: true
    },

    district: {
        type: String,
        maxLength: 50,
        required: true
    },

    ward: {
        type: String,
        maxLength: 50,
        required: true
    },

    houseNumber: {
        type: String,
        maxLength: 50,
        required: true
    },

    phoneNumber: {
        type: String,
        maxLength: 15,
        required: true
    },

    isDefault: {
        type: Boolean,
        default: true
    },

    accountId: {
        type: Schema.Types.ObjectId,
        ref: "Account"
    }
})

module.exports = mongoose.model("Address", AddressSchema)