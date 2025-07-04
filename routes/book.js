const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const book = require('../controllers/book')


router.post('/:catId/book',catchAsync(book.CreateBook))
router.route('/:catId/book/:bookId')
.get(catchAsync(book.FetchSpecificBook))
.put(catchAsync(book.UpdateBook))

module.exports = router