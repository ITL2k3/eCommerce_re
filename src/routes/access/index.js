'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../helpers/asyncHandler.js')
const { checkAuthentication } = require('../../auth/authUtils.js')
const router = express.Router()



// signUp

router.post('/shop/signup',asyncHandler(accessController.signUp))
router.post('/shop/login',asyncHandler(accessController.login))


router.use(checkAuthentication)

router.post('/shop/logout', asyncHandler(accessController.logout))
router.post('/shop/handleRefreshToken', asyncHandler(accessController.handlerRefreshToken))


module.exports = router 