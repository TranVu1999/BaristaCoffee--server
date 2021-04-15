const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const productController = require('../controllers/product')

// @route POST api/product
// @desc Add new product category
// @access Private
router.post('/', verifyToken, productController.addNew)

module.exports = router;