import * as mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    Title: String,
    Year: String
})

const Movie = mongoose.model('Movie', movieSchema)

export default Movie;