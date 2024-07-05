'use strict'
const { AuthFailureError } = require("../core/error.response")
const apiKeyModel = require("../models/apiKey.model")
const { findByKey, createApiKey } = require("../services/apiKey.service")

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization',
  
}

const checkApiKey = async (req, res, next) => {
    
    const key = req.headers[HEADER.API_KEY]?.toString()
    if(!key){
        throw new AuthFailureError('Access Denied')
    }
    const objKey = await findByKey(key)
    if(!objKey){
        throw new AuthFailureError('Access Denied')
    } 
    req.objKey = objKey
    return next()


     
}

const checkPermission = (permission) => {
    return (req,res,next) => {
        // const permission = req.headers[HEADER.permission]?.toString()
        // console.log(req.objKey)
        if(!req.objKey.permissions) {
            throw AuthFailureError('Access Denied')
        }
        const validPermission = req.objKey.permissions.includes(permission)
        if(!validPermission){
            throw AuthFailureError('Access Denied')

        }
        return next()
    }
}

module.exports = {
    checkApiKey,
    checkPermission
}