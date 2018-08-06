const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const mongodb = require('mongodb')
const path = require('path')
const router = require('./router')

const app = express()
const port = 4000
const dbUrl = 'mongodb://localhost:27017/movieToWatch'

app.use(bodyParser.json())
app.use('/', router)

const db = mongoose.connect(dbUrl)
db.then(db => {
    console.log('Connected to MongoDb')
    const server = app.listen(port, () => {
        console.log('Listen on port : ' + server.address().port)
    })
}).catch(err => {
    console.log('MongoD connection failed !')
})

module.exports = app
