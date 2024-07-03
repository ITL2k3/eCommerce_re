'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helpers/asyncHandler.js')
const { checkAuthentication } = require('../../auth/authUtils.js')
const productController = require('../../controllers/product.controller.js')
const router = express.Router()



// signUp

router.use(checkAuthentication)

router.post('', asyncHandler(productController.createProduct))


module.exports = router 