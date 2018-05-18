import * as mongoose from 'mongoose'
import * as bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^[A-Za-z0-9.%+-]+@[A-Za-z0-9.-]+\.[a-zA-Z]{2,}/, 'Email invalid format'],
        max: [254, 'Max number of characters is 254'],
        unique: true
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: true
    }
})

userSchema.methods.setPassword = (password: string) => {
    return bcrypt.hashSync(password, 8)
}

userSchema.methods.isPasswordValid = (password: string, dbPassword: string) => {
    console.log(password + '  getpassword  ' + dbPassword)
    return bcrypt.compare(password, dbPassword)
}

const User = mongoose.model('User', userSchema)

export default User;