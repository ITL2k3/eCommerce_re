const BaseRepository = require("./baseRepo");
const ShopModel = require('../models/shop.model')
class ShopRepository extends BaseRepository {
    constructor(){
        super({
            Model: ShopModel
        })
    }
    async getOneByEmail({emailShop, select = {
        email: 1, password: 1, name: 1, status: 1, role: 1
    }}){
        console.log(emailShop)
        return this.Model.findOne({email : emailShop}).select(select).lean()
    }
}
module.exports = ShopRepository