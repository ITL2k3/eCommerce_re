'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { getInfoData, createRandKeys } = require("../utils")
const { BadRequestError, InternalServerError, AuthFailureError, ForbiddenError } = require("../core/error.response")
const ShopRepository = require("../Repository/ShopRepo")
const { get } = require("lodash")

const ShopHelper = new ShopRepository
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    static handlerRefreshToken = async ({user, keyToken, refreshTokenInUse}) => {
        const {userId, email} = user
        
        if(keyToken.refreshTokensUsed.includes(refreshTokenInUse)) {
            await keyTokenService.removeOneByUserId(userId)
            throw new ForbiddenError('Something wrong happened!! pls relogin')
        }
        if(keyToken.refreshTokenInUse != refreshTokenInUse){
            throw new InternalServerError()
        }

        const {privateKey, publicKey} = createRandKeys()
        const tokens = createTokenPair({userId: userId, email: email },publicKey,privateKey)
        const foundShop = await ShopHelper.getOneByEmail({emailShop: email})
        console.log(foundShop)

        if(!foundShop) throw new InternalServerError()
        //update keyToken
        keyToken.publicKey = publicKey
        keyToken.refreshTokenInUse = tokens.RefreshToken
        keyToken.refreshTokensUsed.push(refreshTokenInUse)
        keyToken.save()
      
        return {
            user: {userId, email},
            tokens
        }

        




    }
    static login = async ({emailShop, passwordShop, refreshToken = null}) => {
        /* 1. check shop by email
        2. match password
        3. generate key
        4. generate token by key
        5. get data and return
        */
        const foundShop = await ShopHelper.getOneByEmail({emailShop})
        if(!foundShop) throw new BadRequestError('Shop not registered')
        console.log(foundShop.password)
        const isMatchPassword = await bcrypt.compare(passwordShop, foundShop.password)
        if(!isMatchPassword) throw new AuthFailureError('password not match')

        const {privateKey, publicKey} = createRandKeys()

        const tokens = createTokenPair({userId: foundShop._id, email: foundShop.email },publicKey,privateKey)

        await keyTokenService.createKeyOfToken({userId: foundShop._id, publicKey: publicKey, refreshToken: tokens.RefreshToken})
        

        return {
            foundShop:getInfoData({fields: ['_id','email','name'],object: foundShop}),
            tokens: tokens
        }

    }


    static logout = async (keyToken) => {
        if(!keyToken) throw new InternalServerError()
        
        const deletedKey = await keyTokenService.removeOneByKeyId(keyToken._id)    
        return {
            message: "logout success",
            deletedKey: deletedKey._id
        }

    }


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
                const { privateKey, publicKey} = createRandKeys()

                const keyToken = await keyTokenService.createKeyOfToken({
                    publicKey: publicKey,
                    userId: newShop._id
                })
                if(!keyToken) throw new InternalServerError()

                const tokens = createTokenPair({userId: newShop._id, email: newShop.email },keyToken.publicKey,privateKey)

                if(!tokens) throw new InternalServerError()

                return {
                    newShop:getInfoData({fields: ['_id','email','name'],object: newShop}),
                    tokens: tokens
            }

        }
    }
}

module.exports = AccessService