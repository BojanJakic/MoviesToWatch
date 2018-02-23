import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as mongodb from 'mongodb'
import * as path from 'path'
import { Router }  from './router'

class Server {

    private app: express.Application;
    private port: number = 4000;
    private url: string = 'mongodb://localhost:27017/movieToWatch'
    private router = new Router()
    
    public constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.app.use('/', this.router.getRouter())
        this.router.routing()
        this.setDatabase()
    }

    public setDatabase() {
        const mongodb = mongoose.connect(this.url)
        mongodb.then(db => {
            console.log('Connected to MongoDb')
            const server = this.app.listen(this.port, () => {
                console.log('Listen on port : ' + server.address().port)
            })
        }).catch(err => {
            console.log('MongoD connection failed !')
        })
    }
}

export default new Server()
