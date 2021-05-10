const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
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
    
    chargeShip: {
        type: Number,
        default: 14000
    },

    new: {
        type: Boolean,
        default: true
    },

    total: {
        type: Number,
        required: true
    },
    
    orderSituation: {
        type: String,
        enum: ["Complete", "Pending", "Transporting", "Cancel"],
        default: "Pending"
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

module.exports = mongoose.model("Invoice", InvoiceSchema)