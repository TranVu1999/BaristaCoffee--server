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

// @route PUT api/store/update
// @desc Update for store
// @access Private
router.put('/update', verifyToken, shopController.update)

// @route GET api/store/
// @desc Get infomation of store
// @access Private
router.get('/', verifyToken, shopController.getInfomation)



module.exports = router;