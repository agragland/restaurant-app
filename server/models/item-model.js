const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Item = new Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        ingredients: {type: [String], required: true},
        price: {type: Number, required: true, default: 0.0},
        img: {type: String, required: true},
        isAvailable: {type: String, required: true}
    },

)

module.exports = mongoose.model('items', Item)