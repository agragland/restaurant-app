const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        birthday: {type: String, required: true},
        rewards: {type: [String], required: false}
    },
)

module.exports = mongoose.model('customers', Customer)
