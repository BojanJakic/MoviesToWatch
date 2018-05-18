import User from '../models/user'
import * as bcrypt from 'bcryptjs'

export class UserCtrl {

    saveUser = (req, res): string => {
        const user = new User(req.body)
        user.password = user.setPassword(user.password)
        return user.save((error, result) => {
            return result ? res.json({ success: true, message: 'You have been registered successfully' }) : res.json({ success: false, message: 'Ops something went wrong, try again...' })
        })
    }

    findByEmail = (req, res) => {
        User.findOne({ email: req.params.email }, (error, result) => {
            return result ? res.json(result) : res.json(error)
        })
    }

    findByUsername = (req, res) => {
        const username = req.params.username || req.body.username
        return User.findOne({ username: username }, function (error, result) {
            return result ? res.json(result) : res.json(error)
        })
    }
}