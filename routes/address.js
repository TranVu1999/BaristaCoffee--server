const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth');

const addressController = require('./../controllers/address')

// @route POST api/address
// @desc add new address
// @access Private
router.post('/', verifyToken, addressController.add)

module.exports = router;