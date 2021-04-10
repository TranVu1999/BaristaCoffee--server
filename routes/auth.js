const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const authController = require('./../controllers/auth')

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post('/register', authController.register)

// @route POST api/auth/login
// @desc Sign in for user
// @access Public
router.post('/login', authController.login)

// @route POST api/auth/login
// @desc Send verify code to email
// @access Public
router.post('/verify', authController.verify)

// @route POST api/auth/check-username
// @desc check username is existed
// @access Public
router.post('/check-username', authController.checkUsername)

module.exports = router;