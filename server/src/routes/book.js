const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/book')

router.post('/create', controller.create)
router.get('/get', controller.get)
router.get('/getBook', controller.getBook)
router.post('/add', passport.authenticate('jwt', { session: false }), controller.add)
router.post('/remove', passport.authenticate('jwt', { session: false }), controller.remove)
router.get('/charts', controller.charts)

module.exports = router
