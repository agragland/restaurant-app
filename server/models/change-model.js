const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Change = new Schema(
    {
        item: {type: String, required: true},
        action: {type: String, required: true}, //Created, Deleted, Updated
        emp: {type: mongoose.Schema.Types.ObjectId, ref: 'employees'}, //Reference to Employee
    },
    {timestamps: true}
)

module.exports = mongoose.model('changes', Change)