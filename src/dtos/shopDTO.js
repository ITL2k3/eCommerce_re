const baseDTO = require('./baseDTO')
const Joi = require('joi')
const _ = require('lodash')
class shopDTO extends baseDTO{
    nameShop
    emailShop
    statusShop
    passwordShop
    validateJoiSchemaShop
    validateFieldShop
    constructor({
        id,
        page,
        limit,
        name,
        email,
        status,
        password
    }){
        super({id,page,limit})
        this.nameShop = name ? name : null
        this.emailShop = email ? email : null
        this.statusShop = status ? status : null
        this.passwordShop = password ? password : null
        
        this.validateJoiSchemaShop = {
            id : this.validateMongoId(),
            nameShop: Joi.string().required(),
            emailShop: Joi.string().email({
                tlds : true
            }).required(),
            statusShop: Joi.string().valid('active', 'inactive'),
            passwordShop: Joi.string().required()

        }
        this.validateFieldShop = {
            id: this.id,
            nameShop : this.nameShop,
            emailShop: this.emailShop,
            statusShop: this.statusShop,
            passwordShop: this.passwordShop
        }
    
    }
    validateCreate(){
        const fields = ['nameShop', 'emailShop', 'passwordShop','statusShop']
        const joiSchemaShop = _.pick(this.validateJoiSchemaShop, fields)
        const validateFieldShop = _.pick(this.validateFieldShop, fields)
        return Joi.object(joiSchemaShop).validate(validateFieldShop)
    }


}

module.exports = shopDTO