const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')

const book = require('../controllers/book')
const { authenticate } = require('../middleware/authenticate')


router.post('/:catId/book',authenticate,catchAsync(book.CreateBook))
router.route('/:catId/book/:bookId')
.get(catchAsync(book.FetchSpecificBook))
.put(authenticate,catchAsync(book.UpdateBook))
router.get('/:catId/book/:bookId/true',authenticate,catchAsync(book.AddToCart))


module.exports = router