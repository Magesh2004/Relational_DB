const express = require('express')
const router = express.Router()

const catchAsync = require('../utils/catchAsync')
const book = require('../controllers/book')
const { authenticate } = require('../middleware/authenticate')
const { isAdmin } = require('../middleware/isAdmin')
const { validateBook,validateUpBook } = require('../middleware/validate')
/**
 * @swagger
 * /book/{bookId}:
 *   get:
 *     summary: Fetching individual book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Id for fetching the book
 *     responses:
 *       200:
 *         description: Data of the book
 *   put:
 *     summary: Updating a book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Id for fetching the book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               inStock:
 *                 type: integer
 *               price:
 *                 type: integer
 *     responses: 
 *       200:
 *         description: Updated succesfully         
 */



router.route('/book/:bookId')
.get(catchAsync(book.FetchSpecificBook))
.put(authenticate,validateUpBook,isAdmin,catchAsync(book.UpdateBook))
/**
 * @swagger
 * /category/{catId}/book:
 *   post:
 *     summary: Adding a new book
 *     tags: [Book]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: To fetch the category
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               inStock:
 *                 type: integer
 *               price:
 *                 type: integer
 *     responses: 
 *       200:
 *         description: Updated succesfully
 */
router.post('/category/:catId/book',validateBook,authenticate,isAdmin,catchAsync(book.CreateBook))

module.exports = router