import Movie from '../models/movie'
import { AuthService } from '../authentication/auth-service'

export class MovieCtrl {

    constructor() { }

    saveMovie = (req, res) => {
        const movie = new Movie(req.body.movie)
        const newAccessToken = req.body.newAccessToken
        Movie.find({ savedBy: movie.savedBy }, (error, result) => {
            if (!error) {
                if (result.length === 3) {
                    newAccessToken ? res.json({ success: false, message: 'You have already saved three movies in this month', newAccessToken: newAccessToken })
                        : res.json({ success: false, message: 'You have already saved three movies in this month' })
                } else {
                    movie.save((error, result) => {
                        if (!error) {
                            newAccessToken ? res.json({ success: true, message: "Movie " + req.body.movie.Title + " has been saved successfully!", newAccessToken: newAccessToken })
                                : res.json({ success: true, message: "Movie " + req.body.movie.Title + " has been saved successfully!" })
                        } else {
                            if (error.code === 11000) {
                                newAccessToken ? res.json({ success: false, message: 'This movie already exists', newAccessToken: newAccessToken })
                                    : res.json({ success: false, message: 'This movie already exists' })
                            }
                        }
                    })
                }
            }
        })
    }

    findAll = (req, res) => {
        Movie.find((error, result) => {
            if (!error) {
                return res.json(result)
            } else {
                return res.json(error)
            }
        })
    }
}

