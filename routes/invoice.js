const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const invoiceController = require('./../controllers/invoice')

// @route POST api/invoice
// @desc add new invoice
// @access Private
router.post('/', verifyToken, invoiceController.add)

// @route POST api/invoice
// @desc get invoice infomation
// @access Private
router.get('/:id', verifyToken, invoiceController.getDetail)

 
module.exports = router;