const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Order = new Schema(
    {
        order_items: [{type: mongoose.Schema.Types.ObjectId, ref: 'items'}],
        comments: {type: [String], required: true}, //CAN BE REVERTED TO SINGLE STRING IF 3.2.3 CLARIFIED
        commped: {type: [Boolean], required: true},
        subtotal: { type: Number, required: false, default: 0.0 },
        tip: { type: Number, required: false, default: 0.0 },
        total: {type: Number, required: false, default: 0.0 },
        status: {type: String, required: false, default: "Created"},
        table: {type: Number, required: true}
    },
    {timestamps: true},
)

module.exports = mongoose.model('orders', Order)