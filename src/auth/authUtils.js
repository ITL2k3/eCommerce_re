
const JWT = require('jsonwebtoken')


const createTokenPair = (payload,publicKey, privateKey) => {
    const AccessToken = JWT.sign(payload, privateKey, {
        algorithm: "RS256",
        expiresIn: "2 days"
    })
    const RefreshToken = JWT.sign(payload,privateKey, {
        algorithm: "RS256",
        expiresIn: "10 days"
    })
    
    JWT.verify(AccessToken, publicKey, (err,decode) => {
        if(err){
            console.log(err)
        }else{
            console.log("decoded: ", decode)
        }
    })
    return {AccessToken, RefreshToken}

}



module.exports = {
    createTokenPair,
}