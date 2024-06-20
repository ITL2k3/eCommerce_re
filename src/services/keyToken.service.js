const keyTokenModel = require("../models/keyToken.model")

class keyTokenService{

    static createKeyOfToken = async ({publicKey, userId}) => {

        const keyToken = keyTokenModel.create({
            userId: userId,
            publicKey: publicKey
        })
        return keyToken.publicKey 

    
    }


}
module.exports = keyTokenService