import { UserCtrl } from '../controllers/user-controller'
import User from '../models/user'
import Token from '../models/refresh-token'
import { RefreshTokenCtrl } from '../controllers/refresh-token-controller'
import * as jwt from 'jsonwebtoken'
import * as jwtExpress from 'express-jwt'

export class AuthService {

    private userCtrl: UserCtrl
    private refreshTokenCtrl: RefreshTokenCtrl
    private accessTokenSecret: string = 'access token secret key'
    private refreshTokenSecret: string = 'refresh token secret key'

    public constructor() {
        this.userCtrl = new UserCtrl()
        this.refreshTokenCtrl = new RefreshTokenCtrl()
    }

    login = (req, res) => {
        const user = new User()
        let i;
        User.findOne({ username: req.body.username }, (error, dbUser) => {
            if (!dbUser) {
                res.json({ success: false, message: 'Invalid username' })
            } else {
                user.isPasswordValid(req.body.password, dbUser.password).then(isValid => {
                    if (!isValid) {
                        res.json({ success: false, message: 'Invalid Password' })
                    } else {
                        const accessToken = this.generateAccessToken(dbUser)
                        const refreshToken = this.generateRefreshToken(dbUser)
                        const token = new Token({ userId: dbUser._id, refreshToken: refreshToken })
                        token.save((error, result) => {
                            result ? res.json({ success: true, tokens: { accessToken: accessToken, refreshToken: refreshToken }, user: dbUser, message: 'You have benn logged in successfully!' }) :
                                res.json({ success: false, message: 'Server error, please try again' })
                        })
                    }
                })
            }
        })
    }

    logout = (req, res) => {
        Token.remove({ refreshToken: req.body.refreshToken, userId: req.body.user._id }, (error, result) => {
            result ? res.json({ success: true, message: 'You have been logged out successfully' }) :
                res.json({ success: false, message: 'You have not been logged out, try again' })
        })
    }

    generateAccessToken = (user) => {
        return jwt.sign({
            user: user,
            exp: Math.floor(Date.now() / 1000) + 30,
        }, this.accessTokenSecret)
    }

    generateRefreshToken = (user) => {
        return jwt.sign({
            user: user,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) // 30 days
        }, this.refreshTokenSecret)
    }

    verifyToken = (req, res, next) => {

        const accessToken = req.body.accessToken
        const refreshToken = req.body.refreshToken
        if (accessToken) {
            jwt.verify(accessToken, this.accessTokenSecret, (error, decoded) => {
                if (error) {
                    if (error.name = 'TokenExpiredError') {
                        Token.findOne({ refreshToken: refreshToken, userId: req.body.user._id }, (error, result) => {
                            if (error) {
                                res.json({ success: false, message: 'Authentication failed' })
                            } else {
                                const newAccessToken = this.generateAccessToken(req.body.user)
                                req.body.newAccessToken = newAccessToken
                                next()
                            }
                        })
                    } else {
                        res.json({ success: false, message: 'Authentication failed' })
                    }
                } else {
                    req.decoded = decoded
                    next()
                }
            })
        } else {
            res.json({ success: false, message: 'You have to be logged in!' })
        }
    }
}