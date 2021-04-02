const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Change = new Schema(
    {
        item: {type: Number, required: true},
        action: {type: String, required: true},
        employee: {type: String, required: true}, //Manager, Lobby, Kitchen
    },
    {timestamps: true}
)

module.exports = mongoose.model('changes', Change)