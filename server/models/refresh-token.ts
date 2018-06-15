import * as mongoose from 'mongoose'

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

const Token = mongoose.model('Token', tokenSchema)

export default Token