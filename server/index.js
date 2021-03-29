const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const apiPort = 3000

const db = require('./db')
const restRouter = require('./routes/restaurant-router')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error',console.error.bind(console, 'MongoDB conncetion error:'))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api',restRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))