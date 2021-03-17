const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Item = require('./item-model')

const Order = new Schema(
    {
        items: { type: [Item], required: true },
        comments: {type: [String], required: true}, //CAN BE REVERTED TO SINGLE STRING IF 3.2.3 CLARIFIED
        subtotal: { type: Number, required: true },
        tip: { type: Number, required: true },
        total: {type: Number, required: true},
        status: {type: String, required: true, default: "Created"}
    },
    {timestamps: true},
)

module.exports = mongoose.model('orders', Order)