'use strict'

const keyTokenModel = require("../models/keyToken.model")

class keyTokenService{

    static createKeyOfToken = async ({publicKey, userId, refreshToken}) => {
        const filter = {userId: userId}
        const update = {
            publicKey: publicKey,
            refreshTokensUsed: [],
            refreshTokenInUse: refreshToken,
        }
        const option = {upsert: true, new : true}
        const keyToken = await keyTokenModel.findOneAndUpdate(filter, update, option)
        return keyToken ? keyToken : null
    
    }
    
    static findOneByUserId = async({userId}) => {
        
        return keyTokenModel.findOne({userId})
    }
    static removeOneByUserId = async({userId}) => {
        return keyTokenModel.findByIdAndDelete({
            userId : userId
        }).lean()
    }

    static removeOneByKeyId = async ({_id}) => {
        return keyTokenModel.findOneAndDelete({
            _id: _id
        }).lean()
    }

}
module.exports = keyTokenService