const Joi = require('joi')
class baseDTO {
    id
    page
    limit 
    keySearch
    createdAt
    updatedAt


    constructor({id, page, limit, keySearch}){
        this.id = id ? id : null;
        this.page = page ? page : 1;
        this.limit = limit ? limit : 10;
        this.keySearch = keySearch ? keySearch : "";
    }
    validateMongoId(){
        return [Joi.string().regex(/^[0-9a-fA-F]{24}$/, 'object Id').required()]
    }
}

module.exports = baseDTO