const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KeyMapSchema = new Schema({
    key: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        default: 1
    },

    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
    },

    createdDate: {
        type: Date,
        default: Date.now
    },

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Account'
    },

    status: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('KeyMap', KeyMapSchema)