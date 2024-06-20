'use strict'

const keyTokenModel = require("../models/keyToken.model")

class keyTokenService{

    static createKeyOfToken = async ({publicKey, userId}) => {

        const keyToken = await keyTokenModel.create({
            userId: userId,
            publicKey: publicKey
        })
        return keyToken.publicKey 

    
    }


}
module.exports = keyTokenService