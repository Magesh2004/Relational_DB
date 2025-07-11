const express = require('express');
const router = express.Router() ;

const catchAsync = require('../utils/catchAsync');
const category = require('../controllers/category')

const { authenticate } = require('../middleware/authenticate');
const { isAdmin } = require('../middleware/isAdmin');
const { validateCategory} = require('../middleware/validate')
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Fetch all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: List of categories
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully
 */


router.route('/category')
.get(catchAsync(category.FetchAllCategory))
.post(authenticate,isAdmin,validateCategory,catchAsync(category.CreateNewCategory))


router.route('/category/:catId')
.get(catchAsync(category.FetchSpecificCategory))
.put(authenticate,validateCategory,isAdmin,catchAsync(category.UpdateCategory))

router
.get('/category/:catid/book/:bookid',authenticate,isAdmin,catchAsync(category.AddBookToCategory))


module.exports = router 