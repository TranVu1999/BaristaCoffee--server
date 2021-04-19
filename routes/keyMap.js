const express = require('express')
const router = express.Router()

const keyMapController = require('./../controllers/keyMap')

// @route POST api/key-map
// @desc get list key
// @access Public
router.post('/', keyMapController.getKey)


module.exports = router;