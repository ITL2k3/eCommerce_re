const BaseRepository = require("./baseRepo");
const {product, electronic, clothing} = require('../models/product.model')
class ProductRepository extends BaseRepository {
    constructor(Model){
        super(Model ? Model : {Model:product})
    }
    
}
class ClothingRepository extends ProductRepository{
    constructor(){
        super({
            Model: clothing
        })
    }
}
class ElectronicRepository extends ProductRepository{
    constructor(){
        super({
            Model: electronic
        })
    }
    
}
module.exports = {
    ProductRepository,
    ClothingRepository,
    ElectronicRepository
}