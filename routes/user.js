const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')

const user = require('../controllers/user')

router.get('/user',catchAsync(user.FetchAll))

module.exports = router