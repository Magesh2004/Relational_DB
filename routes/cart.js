const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');
const catchAsync = require('../utils/catchAsync')
const cart = require('../controllers/cart')

router.post('/book/:bookid/cart/true',authenticate,catchAsync(cart.AddToCart))
router.post('/book/:bookid/cart/false',authenticate,catchAsync(cart.RemoveFromCart))

module.exports = router;