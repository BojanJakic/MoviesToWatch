import { UserCtrl } from '../controllers/user-controller'
import User from '../models/user'
import * as jwt from 'jsonwebtoken'
import * as jwtExpress from 'express-jwt'

export class AuthService {

    private userCtrl: UserCtrl
    private secret: string = 'secret key'
    
    public constructor() {
        this.userCtrl = new UserCtrl()
    }

    authenticate = (req, res) => {
        const user = new User()
        User.findOne({ username: req.body.username }, (error, dbUser) => {
            if (!dbUser) {
                res.json({ success: false, message: 'Invalid username' })

            } else {
                user.isPasswordValid(req.body.password, dbUser.password).then(isValid => {
                    if (!isValid) {
                        res.json({ success: false, message: 'Invalid Password' })
                    } else {
                        const token = this.generateToken(dbUser)
                        res.json({ success: true, token: token, user: dbUser, message: 'You have benn logged in successfully' })
                    }
                })
            }
        })
    }

    generateToken = (user) => {
        return jwt.sign({
            user: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        }, this.secret)
    }

    verifyToken = (req, res, next) => {
        const token = req.body.token
        if(token) {
            console.log(token)
            jwt.verify(token.split(' ')[1], this.secret, (error, decoded) => {
                if(error) {
                    res.json({success: false, message: 'Authentication failed'})
                }else {
                    req.decoded = decoded
                    next()
                }
            })
        }else {
            res.json({success: false, message: 'You have to be logged in!'})
        }
    }
}