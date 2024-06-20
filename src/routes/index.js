'use strict'

const express = require('express')
const { checkApiKey, checkPermission } = require('../auth/checkAuthen')
const { asyncHandler } = require('../helpers/fnWrapper')
const router = express.Router()
//check apiKey

router.use(asyncHandler(checkApiKey))

//check Permission

router.use(checkPermission('0000'))

router.use('/v1/api', require('./access'))


//No path to be found


//handling error

module.exports = router 