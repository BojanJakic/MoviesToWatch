import * as express from 'express'
import { MovieCtrl } from './controllers/movie-controller'
import { UserCtrl } from './controllers/user-controller'
import { AuthService } from './authentication/auth-service'
import * as cors from 'cors'

export class Router {

  private router: express.Router
  private movieCtrl: MovieCtrl
  private userCtrl: UserCtrl
  private auth: AuthService

  public constructor() {
    this.router = express.Router()
    this.movieCtrl = new MovieCtrl()
    this.userCtrl = new UserCtrl()
    this.auth = new AuthService()
    this.configureCors()
  }

  public getRouter() {
    return this.router
  }

  routing = () => {
    // movies
    this.router.post('/api/save/:options',this.auth.verifyToken, this.movieCtrl.saveMovie)
    this.router.get('/api/findAll/movie', this.movieCtrl.findAll)
    //users
    this.router.get('/api/findByEmail/user/:email', this.userCtrl.findByEmail)
    this.router.get('/api/findByUsername/user/:username', this.userCtrl.findByUsername)
    this.router.post('/api/saveUser/user', this.userCtrl.saveUser)
    this.router.post('/api/login/user/', this.auth.authenticate)
  }

  configureCors = () => {
    this.router.use(cors({
      origin: 'http://localhost:4200'
    }))
  }
}