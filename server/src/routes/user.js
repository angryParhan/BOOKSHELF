const express = require('express')
// const passport = require('passport')
const router = express.Router()
const controller = require('../controllers/user')

router.post('/add-book', controller.addBook)
router.post('/add-library', controller.addLibrary)
router.get('/add-library', controller.addLibrary)

module.exports = router
