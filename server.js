const mongodb = require('mongodb')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const MongoClient = mongodb.MongoClient
const app = express()

app.use(bodyParser.json())

app.use(cors({
    origin: 'htpp://localhost:4200'
}))

const urlDb = 'mongodb://localhost:27017/moviToWatch'

let dataBase;

MongoClient.connect(urlDb, (error, db) => {
    dataBase = db
    if(!error) {
        const server = app.listen(4000, () => {
            console.log('Port : ' + server.address().port)
        })
    }
})

app.post('/save/user', (req, res) => {
    return dataBase.collection('users').insertOne(req.body), (error, doc) => {}
})

app.post('/save', (req, res) => {
     console.log(req.body)
    return dataBase.collection('users').insertOne(req.body), (error, doc) => {}
})