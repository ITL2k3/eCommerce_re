'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData } = require("../utils")

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            //step1: check email exists?
            const holderShop = await shopModel.findOne({email}).lean()
            if(holderShop){
                return {
                    code:'xxxx',
                    message: ' Shop already registered!'
                }
            }
            //step2: password after 
            const passwordHash = await bcrypt.hash(password, 10)
            const newShop = await shopModel.create({
                name,email,password: passwordHash, roles: [RoleShop.SHOP]
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

                // if(!publicKeySaved) throw new Error
                const tokens = createTokenPair({userId: newShop._id, email: newShop.email },publicKeySaved,privateKey)

                return {
                    newShop:getInfoData({fields: ['_id','email','name'],object: newShop}),
                    tokens: tokens
                }

                
                

            }

        }catch(error) {
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService