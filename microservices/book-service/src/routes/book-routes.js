const express = require('express')
const BookController = require('../controllers/book-controller')
const bookController = require('../controllers/book-controller')

const router = express.Router()

router.get('/search', BookController.searchBook)
router.post('/add', bookController.addBook)

module.exports = router
