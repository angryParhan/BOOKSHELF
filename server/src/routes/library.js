const express = require('express')
const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/library')

router.post('/create', passport.authenticate('jwt', { session: false }), controller.create)
router.post('/add', passport.authenticate('jwt', { session: false }), controller.add)
router.put('/edit', passport.authenticate('jwt', { session: false }), controller.edit)
router.delete('/delete', passport.authenticate('jwt', { session: false }), controller.delete)
router.delete('/remove', passport.authenticate('jwt', { session: false }), controller.remove)
router.get('/getAll', controller.getAll)
router.get('/get', controller.get)
router.get('/latest', controller.latest)

module.exports = router
