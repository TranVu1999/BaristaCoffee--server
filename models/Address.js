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
        require: true
    },

    district: {
        type: String,
        maxLength: 50,
        require: true
    },

    wards: {
        type: String,
        maxLength: 50,
        require: true
    },

    houseNumber: {
        type: String,
        maxLength: 50,
        require: true
    },

    phoneNumber: {
        type: String,
        maxLength: 15,
        require: true
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