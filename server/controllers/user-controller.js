const User = require('../models/user')
const bcrypt = require('bcryptjs')

const saveUser = (req, res) => {
    const user = new User(req.body)
    user.password = user.setPassword(user.password)
    return user.save((error, result) => {
        return result ? res.json({ success: true, message: 'You have been registered successfully' }) : res.json({ success: false, message: 'Ops something went wrong, try again...' })
    })
}

const findByEmail = (req, res) => {
    User.findOne({ email: req.params.email }, (error, result) => {
        return result ? res.json(result) : res.json(error)
    })
}

const findByUsername = (req, res) => {
    const username = req.params.username || req.body.username
    return User.findOne({ username: username }, function (error, result) {
        return result ? res.json(result) : res.json(error)
    })
}

const voteMovie = (req, res, next) => {
    User.findById({ _id: req.body.user._id }, function (error, result) {
        if(error) {
            res.json(error)
        } else {
            if(result.votedMovies.length === 3) {
                res.json({ success: false, message: 'You have already voted three movies in this month' }) 
            } else if(result.votedMovies.indexOf(req.body.movieId) !== -1){
                res.json({ success: false, message: 'You have already voted this movie' })
            } else {
                User.findByIdAndUpdate({ _id: result._id }, { $push: { votedMovies: req.body.movieId }}, (error, result) => {
                    return error ? res.json('Something went wrong, try again') : next()
                })
            }

        }
    })
    // User.findOneAndUpdate({username: req.body.user.username}, {$push: { votedMovies: req.body.movieId }}, { runValidators: true }, (error, result) => {
    //     return result ? res.json('aaaaa') : res.json(error)
    //})
}

module.exports = {
    saveUser,
    findByEmail,
    findByUsername,
    voteMovie
}