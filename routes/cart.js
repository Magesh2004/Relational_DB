const express = require('express');
const router = express.Router();

const { authenticate } = require('../middleware/authenticate');
const catchAsync = require('../utils/catchAsync')
const cart = require('../controllers/cart');

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Fetch the current user cart
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cart fetched successfully
 */
router.get('/cart',authenticate,catchAsync(cart.FetchCart))
/**
 * @swagger
 * /cart/{bookId}:
 *   post:
 *     summary: Add a book to the user cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book to add
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 default: 1
 *     responses:
 *       200:
 *         description: Book added to cart successfully
 *   delete:
 *     summary: Remove a book from the user cart
 *     tags: [Cart]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the book 
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book removed from cart successfully
 */
router.route('/cart/:bookId')
.post(authenticate,catchAsync(cart.AddToCart))
.delete(authenticate,catchAsync(cart.RemoveFromCart))

module.exports = router;