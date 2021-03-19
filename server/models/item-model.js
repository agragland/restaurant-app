const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        ingredients: {type: [String], required: true},
        price: {type: Number, required: true, default: 0.0},
        img: {type: String, required: false, default: ""},
        isAvailable: {type: Boolean, required: false, default: true} //TODO: change to boolean
    },

)

module.exports = mongoose.model('items', Item)