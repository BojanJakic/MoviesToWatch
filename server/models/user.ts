import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    userName: String,
    password: String
})

const User = mongoose.model('User', userSchema)

export default User;