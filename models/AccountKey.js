const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AccountKeySchema = new Schema({
    
    key: {
        type: String,
        required: true
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
});

module.exports = mongoose.model("AccountKey", AccountKeySchema)