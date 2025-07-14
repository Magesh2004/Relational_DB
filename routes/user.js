const express = require('express')
const router = express.Router()

const {authenticate} = require('../middleware/authenticate')
const catchAsync = require('../utils/catchAsync')
const user = require('../controllers/user')
const {validateUser} = require('../middleware/validate')

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, role]
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [USER, ADMIN]
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post('/auth/register',validateUser,catchAsync(user.RegisterNewUser))
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, password]
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Access and refresh tokens returned
 */
router.post('/auth/login',catchAsync(user.LoginUser))

router.post('/auth/logout',catchAsync(user.LogoutUser))
/**
 * @swagger
 * /auth/ref:
 *   post:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated
 */
router.post('/auth/ref',catchAsync(user.FetchNewAccessToken))


module.exports = router;