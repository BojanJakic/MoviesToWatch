// const mongodb = require('mongodb')
// const express = require('express')
// const bodyParser = require('body-parser')
// const cors = require('cors')
// const MongoClient = mongodb.MongoClient
// const app = express()
// const router = express.Router()
// app.use(bodyParser.json())

// // app.use(cors({
// //     origin: 'htpp://localhost:4200'
// // }))

// app.use(cors())

// const urlDb = 'mongodb://localhost:27017/movieToWatch'

// let dataBase;

// MongoClient.connect(urlDb, (error, db) => {
//     dataBase = db
//     if (!error) {
//         const server = app.listen(4000, () => {
//             console.log('Port : ' + server.address().port)
//         })

//     } else {
//         console.log('MONGO : ' + error)
//     }
// })

// app.post('/save/user', (req, res) => {
//     return dataBase.collection('users').insertOne(req.body).then(result => {
//         res.json(result)
//     }).catch(error => {
//         res.json(error)
//     })
// })

// app.post('/save/movie', (req, res) => {
//     dataBase.collection('movies').insertOne(req.body).then((result) => {
//         res.json(result)
//     }).catch((error) => {
//         res.json(error)
//     })
// })

// app.get('/find/movie', (reg, res) => {
//     dataBase.collection('movies').find({}).toArray().then(result => {
//         res.json(result)
//     }).catch((error) => {
//         res.json(error)
//     })
// })

// app.get('/findByEmail/user/:email', (req, res) => {
//     const query = { email: req.params.email }
//     dataBase.collection('users').findOne(query).then(result => {
//         res.json(result)
//     }).catch(error => {
//         res.json(error)
//     })
// })

// app.get('/find/users', (req,res) => {
//     dataBase.collection('users').find().toArray().then(result => {
//         res.json()
//     }).catch(error => {
//         res.json()
//     })
// })
