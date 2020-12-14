const express = require('express')
// const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/book')

router.post('/create', controller.create)
router.get('/get', controller.get)
router.post('/add', controller.add)

module.exports = router
