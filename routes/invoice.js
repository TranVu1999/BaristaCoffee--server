const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const invoiceController = require('./../controllers/invoice')

// @route POST api/check-password
// @desc Update account infomation
// @access Private
router.post('/', verifyToken, invoiceController.add)

 
module.exports = router;