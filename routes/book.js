const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const book = require('../controllers/book')


router.route('/book/:bookId')
.get(catchAsync(book.FetchSpecificBook))
.put(catchAsync(book.UpdateBook))
router.post('/:catId/book',catchAsync(book.CreateBook))

module.exports = router