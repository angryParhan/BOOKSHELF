const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/library')

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create)
router.delete('/delete', passport.authenticate('jwt', { session: false }), controller.delete)
router.put('/edit', passport.authenticate('jwt', { session: false }), controller.edit)

module.exports = router
