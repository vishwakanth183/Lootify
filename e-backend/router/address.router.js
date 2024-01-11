const express = require('express');
const router = express.Router()
const { addAddress } = require('../controller/address.controller');
const addressValidator = require('./validators/address.validator').addressValidator
const validator = require("../middleware/validate.schema")
router.post('/add', addressValidator.address, validator.validate, addAddress)
module.exports = router; 