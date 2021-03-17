const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
    {
        _id: {type: Number, required: true, unique: true},
        name: { type: String, required: true },
        role: { type: String, required: true }, //Manager, Lobby, Kitchen
        password: {type: String, required: false}
    },
)

module.exports = mongoose.model('employees', Employee)