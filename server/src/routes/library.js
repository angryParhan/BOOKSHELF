const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/library')

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create)
router.post('/add', passport.authenticate('jwt', { session: false }), controller.add)

module.exports = router
