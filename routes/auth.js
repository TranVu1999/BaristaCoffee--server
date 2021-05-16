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

// @route POST api/auth/check-username
// @desc check username is existed
// @access Public
router.post('/check-username', authController.checkUsername)


// =================================== PUT ================================

// @route update api/auth/drop-by-list-invoice
// @desc update new property of list invoice
// @access Private
router.put('/drop-by-list-invoice', verifyToken, authController.updateListInvoice)



// DELETE

// @route DELETE api/auth/remove-product
// @desc remove product of account
// @access Private
router.delete('/remove-product/:title/:productId', verifyToken, authController.removeProduct)

module.exports = router;