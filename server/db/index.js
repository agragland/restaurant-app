const mongoose = require('mongoose')

mongoose
    .connect('mongodb+srv://admin:hunter3@cluster0.vbesc.mongodb.net/electronicrestaurant-mofad?retryWrites=true&w=majority',
        { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db