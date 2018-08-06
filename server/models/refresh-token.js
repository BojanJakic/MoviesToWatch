const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    }
})

const RefreshToken = mongoose.model('Token', tokenSchema)

module.exports = RefreshToken