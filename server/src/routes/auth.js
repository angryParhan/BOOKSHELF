const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.post('/registration', controller.registration)
router.get('/check', controller.checkExisted)

module.exports = router

