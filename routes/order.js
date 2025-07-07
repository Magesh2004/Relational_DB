const express = require('express');
const router = express.Router()

const order = require('../controllers/order');
const catchAsync = require('../utils/catchAsync');
const { authenticate } = require('../middleware/authenticate');

router.route('/order')
.get(authenticate,catchAsync(order.FetchAllOrder))
.post(authenticate,catchAsync(order.PlaceOrder))

router.put('/order/:orderId/pay',authenticate,catchAsync(order.MakePayment))

router.put('/order/:orderId/status',authenticate,catchAsync(order.UpadateStatus))

router.put('/order/:orderId/cancel',authenticate,catchAsync(order.CancelOrder))


module.exports= router