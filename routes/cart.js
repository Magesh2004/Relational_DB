const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');
const catchAsync = require('../utils/catchAsync')
const cart = require('../controllers/cart');

router.get('/cart',authenticate,catchAsync(cart.FetchCart))
router.route('/cart/:bookId')
.post(authenticate,catchAsync(cart.AddToCart))
.delete(authenticate,catchAsync(cart.RemoveFromCart))

module.exports = router;