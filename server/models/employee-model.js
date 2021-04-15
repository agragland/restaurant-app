const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = new Schema(
    {
        emp_id: {type: Number, required: true},
        name: { type: String, required: true },
        role: { type: String, required: true }, //Manager, Lobby, Kitchen
        password: {type: String, required: false, default: ""} //Only Managers have password
    },
)

module.exports = mongoose.model('employees', Employee)