const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Table = new Schema(
    {
        table_num: {type: Number, required: true},
        status: {type: String, required: false, default: "Available" },
        refills: [{type: String, required: false, default: ''}],
        assistance: {type: Boolean, required: false, default: false},
        manualOrder: {type: Boolean, required: false, default: false},
        payCash: {type: Boolean, required: false, default: false},
        takeoutBox: {type: Boolean, required: false, default: false}
    },
)

module.exports = mongoose.model('tables', Table)