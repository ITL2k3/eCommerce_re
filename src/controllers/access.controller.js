'use strict'

const { CREATED, SuccessResponse } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        new CREATED({
            message: 'Create new Shop success',
            metadata : await AccessService.signUp(req.body)
        }).send(res) 
       
    }
    login = async (req, res, next) => {

    }

    logout = async (req,res,next) => {

    }

}


module.exports =  new AccessController