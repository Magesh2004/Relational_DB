const express = require('express');
const router = express.Router() ;

const catchAsync = require('../utils/catchAsync');
const category = require('../controllers/category')


router.route('/category')
.get(catchAsync(category.FetchAllCategory))
.post(catchAsync(category.CreateNewCategory))

router.route('/category/:catId')
.get(catchAsync(category.FetchSpecificCategory))
.put(catchAsync(category.UpdateCategory))

router
.get('/category/:catid/book/:bookid',catchAsync(category.AddBookToCategory))


module.exports = router 