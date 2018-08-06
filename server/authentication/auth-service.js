const userCtrl = require('../controllers/user-controller')
const User = require('../models/user')
const RefreshToken = require('../models/refresh-token')
const refreshTokenCtrl = require('../controllers/refresh-token-controller')
const jwt = require('jsonwebtoken')
const jwtExpress = require('express-jwt')

const accessTokenSecret = 'access token secret key'
const refreshTokenSecret = 'refresh token secret key'

const login = (req, res) => {
    const user = new User()
    User.findOne({ username: req.body.username }, (error, dbUser) => {
        if (!dbUser) {
            res.json({ success: false, message: 'Invalid username' })
        } else {
            user.isPasswordValid(req.body.password, dbUser.password).then(isValid => {
                if (!isValid) {
                    res.json({ success: false, message: 'Invalid Password' })
                } else {
                    const accessToken = generateAccessToken(dbUser)
                    const refreshToken = generateRefreshToken(dbUser)
                    const token = new RefreshToken({ userId: dbUser._id, refreshToken: refreshToken })
                    token.save((error, result) => {
                        result ? res.json({ success: true, tokens: { accessToken: accessToken, refreshToken: refreshToken }, user: dbUser, message: 'You have benn logged in successfully!' }) :
                            res.json({ success: false, message: 'Server error, please try again' })
                    })
                }
            })
        }
    })
}

const logout = (req, res) => {
    RefreshToken.remove({ refreshToken: req.body.refreshToken, userId: req.body.user._id }, (error, result) => {
        result ? res.json({ success: true, message: 'You have been logged out successfully' }) :
            res.json({ success: false, message: 'You have not been logged out, try again' })
    })
}

const generateAccessToken = (user) => {
    return jwt.sign({
        user: user,
        exp: Math.floor(Date.now() / 1000) + 30,
    }, accessTokenSecret)
}

const generateRefreshToken = (user) => {
    return jwt.sign({
        user: user,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30) // 30 days
    }, refreshTokenSecret)
}

const verifyToken = (req, res, next) => {
    const accessToken = req.body.accessToken
    const refreshToken = req.body.refreshToken
    if (accessToken) {
        jwt.verify(accessToken, accessTokenSecret, (error, decoded) => {
            if (error) {
                if (error.name = 'TokenExpiredError') {
                    RefreshToken.findOne({ refreshToken: refreshToken, userId: req.body.user._id }, (error, result) => {
                        if (error) {
                            res.json({ success: false, message: 'Authentication failed' })
                        } else {
                            const newAccessToken = generateAccessToken(req.body.user)
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

module.exports = {
    login,
    logout,
    generateAccessToken,
    generateRefreshToken,
    verifyToken
}