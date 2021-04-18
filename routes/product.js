const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const productController = require('../controllers/product')

// @route POST api/product
// @desc Add new product category
// @access Private
router.post('/', verifyToken, productController.addNew)

// @route POST api/product/filter
// @desc Get list product
// @access Public
router.post('/filter', productController.filter)

// @route GET api/product/top-rate
// @desc Get list top 3 rated product
// @access Public
router.get('/top-rate', productController.filterTopRate)

module.exports = router;