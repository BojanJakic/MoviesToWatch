const express = require('express')
const router = express.Router()
const movieCtrl = require('./controllers/movie-controller')
const userCtrl = require('./controllers/user-controller')
const authService = require('./authentication/auth-service')
const cors = require('cors')


router.use(cors({
  origin: 'http://localhost:4200'
}))

// movies
router.post('/api/save/:options', authService.verifyToken, movieCtrl.saveMovie)
router.get('/api/findAll/movie', movieCtrl.findAll)
//users
router.get('/api/findByEmail/user/:email', userCtrl.findByEmail)
router.get('/api/findByUsername/user/:username', userCtrl.findByUsername)
router.post('/api/saveUser/user', userCtrl.saveUser)
router.post('/api/login/user/', authService.login)
router.post('/api/logout/user/', authService.logout)
router.post('/api/voteMovie/:data', authService.verifyToken, userCtrl.voteMovie, movieCtrl.updateNumberOfVoices)

module.exports = router
