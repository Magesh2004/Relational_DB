const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const book = require('../controllers/book')
const { authenticate } = require('../middleware/authenticate')
const { isAdmin } = require('../middleware/isAdmin')
const { validateBook,validateUpBook } = require('../middleware/validate')


router.route('/book/:bookId')
.get(catchAsync(book.FetchSpecificBook))
.put(authenticate,validateUpBook,isAdmin,catchAsync(book.UpdateBook))
router.post('/category/:catId/book',validateBook,authenticate,isAdmin,catchAsync(book.CreateBook))

module.exports = router