const express = require('express')
const router = express.Router()

const verifyToken = require('../middleware/auth');

const prodCateController = require('../controllers/productCategory')

// @route POST api/store/product-category
// @desc Add new product category
// @access Private
router.post('/', verifyToken, prodCateController.addNew)

// @route GET api/store/product-category
// @desc Get all product category
// @access Public
router.get('/', prodCateController.getAll)


module.exports = router;