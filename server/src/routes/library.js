const express = require('express')
// const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/library')

router.post('/create', controller.create)
router.post('/add', controller.add)

module.exports = router
