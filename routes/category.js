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

/**
 * @swagger
 * /category/{catId}:
 *   get:
 *     summary: Fetching specific category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: id to fech category
 *     responses:
 *       200:
 *         description: Fetch a category
 *   put:
 *     summary: updating category 
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *         description: id to fetch category
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
 *       200:
 *         description: Added new category           
 */    

router.route('/category/:catId')
.get(catchAsync(category.FetchSpecificCategory))
.put(authenticate,validateCategory,isAdmin,catchAsync(category.UpdateCategory))
/**
 * @swagger
 * /category/{catId}/book/{bookId}:
 *   get:
 *     summary: Adding the book to a category
 *     tags: [Category]
 *     parameters:
 *       - in : path
 *         name: catId
 *         required: true
 *         schema:
 *           type: string
 *       - in : path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Added to the category
 *      
 */
router
.get('/category/:catId/book/:bookId',authenticate,isAdmin,catchAsync(category.AddBookToCategory))


module.exports = router 

