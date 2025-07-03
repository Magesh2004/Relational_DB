const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')

const user = require('../controllers/user')


router.post('/auth/register',catchAsync(user.RegisterNewUser))
router.post('/auth/login',catchAsync(user.LoginUser))
router.post('/auth/logout',catchAsync(user.LogoutUser))
router.post('/auth/ref',catchAsync(user.FetchNewAccessToken))


module.exports = router