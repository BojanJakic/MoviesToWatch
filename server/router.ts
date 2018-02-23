import * as express from 'express'
import { MovieCtrl } from './controllers/movie-controller'
import * as cors from 'cors'

// const router = express.Router()
// router.use(cors())
// const movieCtrl = new MovieCtrl()
// export default router

export class Router {

  private router: express.Router
  private movieCtrl: MovieCtrl

  public constructor() {
    this.router = express.Router()
    this.router.use(cors())
    this.movieCtrl = new MovieCtrl()
  }

  public getRouter() {
    return this.router
  }

  public routing() {
    this.router.post('/api/save/movie', this.movieCtrl.saveMovie)
  }
}

// export default this.router