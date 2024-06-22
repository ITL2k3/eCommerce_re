'use strict'

const { CREATED, SuccessResponse } = require("../core/success.response")
const shopDTO = require("../dtos/shopDTO")
const AccessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {

        
        const reqShopDTO = new shopDTO(req.body) 

        const isValidShop = reqShopDTO.validateCreate()


        if (isValidShop && isValidShop["error"]) {
        
            throw new BadRequestError(
                isValidShop["error"].message
            );
        }
        new CREATED({
            message: 'Create new Shop success',
            metadata : await AccessService.signUp(reqShopDTO)
        }).send(res) 
       
    }
    login = async (req, res, next) => {

    }

    logout = async (req,res,next) => {

    }

}


module.exports =  new AccessController