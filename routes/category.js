const express = require('express');
const router = express.Router() ;

const catchAsync = require('../utils/catchAsync');
const category = require('../controllers/category')


router.route('/category')
.get(catchAsync(category.FetchAllCategory))
.post(authenticate,isAdmin,catchAsync(category.CreateNewCategory))

router.route('/category/:catId')
.get(catchAsync(category.FetchSpecificCategory))
.put(authenticate,isAdmin,catchAsync(category.UpdateCategory))

router
.get('/category/:catid/book/:bookid',authenticate,isAdmin,catchAsync(category.AddBookToCategory))


module.exports = router 