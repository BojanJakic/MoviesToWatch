const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    imdbID: {
        type: String,
        unique: [true, 'not unique ...'],
        required: true
    },
    Title: {
        type: String,
        required: true
    },
    Year: {
        type: String,
        required: true
    },
    Actors: {
        type: String,
        required: true
    },
    Writer: {
        type: String,
        required: true
    },
    Released: {
        type: String,
        required: true
    },
    Runtime: {
        type: String,
        required: true
    },
    Director: {
        type: String,
        reqiured: true
    },
    Country: {
        type: String,
        required: true
    },
    Genre: {
        type: String,
        required: true
    },
    Awards: {
        type: String,
        required: true
    },
    Plot: {
        type: String,
        required: true
    },
    Production: {
        type: String,
        required: [true, 'blah blah']
    },
    Poster: {
        type: String,
        required: true
    },
    voices: {
        type: Number,
        default: 0
    },
    savedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;