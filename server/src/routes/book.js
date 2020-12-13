const express = require('express')
// const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/book')

router.post('/create', controller.create)

module.exports = router
