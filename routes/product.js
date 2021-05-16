const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const productController = require('../controllers/product')

// =============== POST =================
// @route POST api/product/comment
// @desc Add new comment product
// @access Private
router.post('/comment', verifyToken, productController.addComment)

// @route POST api/auth/drop-by
// @desc Add new product to dropby product
// @access Private
router.post('/drop-by', productController.dropBy)


// @route POST api/product
// @desc Add new product 
// @access Private
router.post('/', verifyToken, productController.addNew)

// @route POST api/product/filter
// @desc Get list product
// @access Public
router.post('/filter', productController.filter)

// @route GET api/product/:alias
// @desc Get product detail
// @access Public
router.get('/detail/:alias', productController.getProductInfomation)

// @route GET api/product/top-rate
// @desc Get list top 3 rated product
// @access Public
router.get('/top-rate', productController.filterTopRate)

module.exports = router;