const express = require('express');
const router = express.Router() ;

const {authenticate} = require('../middleware/authenticate')
const catchAsync = require('../utils/catchAsync');

const category = require('../controllers/category')


router.route('/')
.get(catchAsync(category.FetchAllCategory))
.post(authenticate,catchAsync(category.CreateNewCategory))

router.route('/:catId').get(catchAsync(category.FetchSpecificCategory))
.put(authenticate,catchAsync(category.UpdateCategory))


module.exports = router 