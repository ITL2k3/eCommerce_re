'use strict'

const { CREATED, SuccessResponse } = require("../core/success.response")
const shopDTO = require("../dtos/shopDTO")
const AccessService = require("../services/access.service")

class AccessController {
    
    handlerRefreshToken = async (req,res,next) => {
        new SuccessResponse({
            message: "new Tokens returned!",
            metadata: await AccessService.handlerRefreshToken(req)
        }).send(res)
    }
    
    login = async (req, res, next) => {
        const reqShopDTO = new shopDTO(req.body) 

        const isValidShop = reqShopDTO.validateLogin()
        
        if (isValidShop && isValidShop["error"]) {
        
            throw new BadRequestError(
                isValidShop["error"].message
            );
        }
        new SuccessResponse({
            message: 'shop login success',
            metadata : await AccessService.login(reqShopDTO)
        }).send(res) 
    }
    
    logout = async (req,res,next) => {
        console.log(req.keyToken)
        new SuccessResponse({
            message: 'shop logout success',
            metadata: await AccessService.logout(req.keyToken)
        }).send(res)
    }


    signUp = async (req, res, next) => {

        
        const reqShopDTO = new shopDTO(req.body) 

        const isValidShop = reqShopDTO.validateSignup()

        console.log
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
    

}


module.exports =  new AccessController