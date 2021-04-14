const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AddressSchema = new Schema ({
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

    wards: {
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

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Address", AddressSchema)