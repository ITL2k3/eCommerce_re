
const JWT = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { BadRequestError, NotFoundError, AuthFailureError } = require('../core/error.response')
const keyTokenService = require('../services/keyToken.service')

const HEADER = {
    API_KEY : 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'x-client-id',
    REFRESH_TOKEN: 'refresh-token'
  
}

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

const checkAuthentication = asyncHandler( async (req,res,next) => {

    const userId = req.headers[HEADER.CLIENT_ID]
    if(!userId) throw new BadRequestError('Invalid request!')

    const keyToken = await keyTokenService.findOneByUserId({userId})
    if(!keyToken) throw new NotFoundError('Key not found!')
    
    const refreshToken  = req.headers[HEADER.REFRESH_TOKEN]
    if(!refreshToken) {
        throw new BadRequestError('Invalid token, please relogin')
    }
    const decodedUser = JWT.verify(refreshToken, keyToken.publicKey)
    if(decodedUser.userId != userId) throw new AuthFailureError('Invalid userId!')
    
    req.keyToken = keyToken
    req.user = decodedUser
    req.refreshTokenInUse = refreshToken
    return next()

    
})




module.exports = {
    createTokenPair,
    checkAuthentication
}