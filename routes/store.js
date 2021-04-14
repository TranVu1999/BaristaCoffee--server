const express = require('express')
const router = express.Router()
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const verifyToken = require('../middleware/auth');

const shopController = require('../controllers/store')

// @route POST api/store/register
// @desc Register for store
// @access Private
router.post('/register', verifyToken, shopController.register)



module.exports = router;