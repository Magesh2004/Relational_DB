const express = require('express');
const router = express.Router() ;

const catchAsync = require('../utils/catchAsync');

const category = require('../controllers/category')

router.route('/')
.get(catchAsync(category.FetchAllCategory))
.post(catchAsync(category.CreateNewCategory))

router.route('/:catId').get(catchAsync(category.FetchSpecificCategory))
.put(catchAsync(category.UpdateCategory))


module.exports = router 