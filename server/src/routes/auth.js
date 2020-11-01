const express = require('express')
// const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/auth')

router.post('/login', controller.login)
router.post('/registration', controller.registration)
router.get('/check', controller.checkExisted)
// router.get('/get', passport.authenticate('jwt', { session: false }), controller.checkExisted) // test route


module.exports = router

