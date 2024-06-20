const { timingSafeEqual } = require('crypto')
const {StatusCodes,ReasonPhrases} = require('./httpStatusCode')

class SuccessResponse {
    constructor({message, statusCode = StatusCodes.OK, reasonStatusCode = ReasonPhrases.OK, metadata = {}}){
        this.message = message ? message : reasonStatusCode
        this.statusCode = statusCode
        this.reasonStatusCode = reasonStatusCode
        this.metadata = metadata
    }
    send(res,headers = {}){
        return res.status(this.statusCode).json(this)
    }
}

class OK extends SuccessResponse{
    constructor({message, metadata}){
        super({message, metadata})
    }
}

class CREATED extends SuccessResponse{
    constructor({option = {},message, statusCode = StatusCodes.CREATED, reasonStatusCode = ReasonPhrases.CREATED, metadata ={}}){
        super({message,statusCode,reasonStatusCode,ReasonPhrases,metadata})
        this.option = option
    }
}

module.exports = {
    OK, CREATED, SuccessResponse
}