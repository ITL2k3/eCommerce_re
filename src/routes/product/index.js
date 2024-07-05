'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helpers/asyncHandler.js')
const { checkAuthentication } = require('../../auth/authUtils.js')
const productController = require('../../controllers/product.controller.js')
const router = express.Router()

//for guest
router.get('/search/:keyWord',asyncHandler(productController.searchProductByName))

router.get('',asyncHandler(productController.getAllPublicProduct))

// signUp
router.use(checkAuthentication)

router.post('', asyncHandler(productController.createProduct))


router.post('/publish/:id', asyncHandler(productController.publishProductByShop))
router.post('/unpublish/:id', asyncHandler(productController.unPublishProductByShop))

router.get('/drafts/all', asyncHandler(productController.getAllDraftProduct))


module.exports = router 