const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const authController = require('./../controllers/auth')


// @route POST api/update
// @desc Update account infomation
// @access Private
router.post('/update', verifyToken, authController.update)

// @route POST api/check-password
// @desc Update account infomation
// @access Private
router.post('/check-password', verifyToken, authController.checkPassword)

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', authController.register)

// @route POST api/auth/login
// @desc Sign in for user
// @access Public
router.post('/login', authController.login)

// @route POST api/auth/check-logged
// @desc Check user is logged
// @access Public
router.post('/check-logged', authController.checkLogged)

// @route POST api/auth/login
// @desc Send verify code to email
// @access Public
router.post('/verify', authController.verify)

// @route POST api/auth/drop-by
// @desc Add new product to dropby product
// @access Private
router.post('/drop-by', verifyToken, authController.dropByProduct)

// @route POST api/auth/check-username
// @desc check username is existed
// @access Public
router.post('/check-username', authController.checkUsername)

module.exports = router;