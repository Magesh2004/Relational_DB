const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const book = require('../controllers/book')
const { authenticate } = require('../middleware/authenticate')
const { isAdmin } = require('../middleware/isAdmin')


router.route('/book/:bookId')
.get(catchAsync(book.FetchSpecificBook))
.put(authenticate,isAdmin,catchAsync(book.UpdateBook))
router.post('/:catId/book',authenticate,isAdmin,catchAsync(book.CreateBook))

module.exports = router