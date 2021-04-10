const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InvoiceSchema = new Schema({
    chargeShip: {
        type: Number,
        require: true
    },

    phoneNumber: {
        type: String,
        maxLength: 15,
        require: true
    },

    fullname: {
        type: String,
        maxLength: 50,
        require: true
    },

    addressId: {
        type: Schema.Types.ObjectId,
        ref: Address
    },

    isNew: {
        type: Boolean,
        default: true
    },

    total: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        maxLength: 50,
        require: true
    },
    
    orderSituation: {
        type: String,
        enum: ["Complete", "Pending", "Transporting", "Cancel"],
        default: "Prending"
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