const BaseRepository = require("./baseRepo");
const ShopModel = require('../models/shop.model')
class ShopRepository extends BaseRepository {
    constructor(){
        super({
            Model: ShopModel
        })
    }
}
module.exports = ShopRepository