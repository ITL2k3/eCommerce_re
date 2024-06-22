'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { BadRequestError, InternalServerError } = require("../core/error.response")
const ShopRepository = require("../Repository/ShopRepo")

const ShopHelper = new ShopRepository
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async ({nameShop, emailShop, passwordShop}) => {
            //step1: check email exists?
            const holderShop = await ShopHelper.getOneByConditions({email: emailShop})
            console.log(holderShop)
            if(holderShop){
                throw new BadRequestError('Shop already Exists!')
            }
            //step2: password after 
            const passwordHash = await bcrypt.hash(passwordShop, 10)
            const newShop = await shopModel.create({
                name : nameShop,email: emailShop,password: passwordHash, roles: [RoleShop.SHOP]
            })
            if(newShop){
                //created privateKey, publicKey 
                const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem',
                    },
                })

                const publicKeySaved = await keyTokenService.createKeyOfToken({
                    publicKey: publicKey,
                    userId: newShop._id
                })
                if(!publicKeySaved) throw new InternalServerError()

                const tokens = createTokenPair({userId: newShop._id, email: newShop.email },publicKeySaved,privateKey)

                if(!tokens) throw new InternalServerError()

                return {
                    newShop:getInfoData({fields: ['_id','email','name'],object: newShop}),
                    tokens: tokens
            }

        }
    }
}

module.exports = AccessService