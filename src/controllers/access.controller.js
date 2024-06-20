'use strict'

const AccessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        try{
          
            
            return res.status(201).json({
                code: '201',
                metadata: await AccessService.signUp(req.body)
            })
        } catch(error){
            next(error)
        }
    }
}


module.exports =  new AccessController