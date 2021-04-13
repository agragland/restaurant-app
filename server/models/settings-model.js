const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Settings = new Schema(
    {
        startTime: {type: String, required: true},
        endTime: {type: String, required: true},
})

module.exports = mongoose.model('settings',Settings)