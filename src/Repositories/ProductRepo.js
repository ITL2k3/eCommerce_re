'use strict'
const BaseRepository = require("./baseRepo");
const {product, electronic, clothing, furniture} = require('../models/product.model')
class ProductRepository extends BaseRepository {
    constructor(Model){
        super(Model ? Model : {Model:product})
    }
    searchProduct(keyword){
        console.log(keyword)
        return this.Model.find({
            isPublish: true,
            $text: {$search : `${keyword}`} },
            {score: {$meta: 'textScore'},
            
            
        }).sort({score: {$meta: 'textScore'}}).lean().exec()
    }

    getAllPublic(limit = 50, skip = 0){
        return this.Model.find({
            isPublish: true
        }).populate('product_shop', 'name email -_id')
        .sort({updatedAt: -1})
        .skip(skip)
        .limit(limit)
        .lean().exec()
    }

    getAllDraftByShopId(shopId, limit = 50, skip = 0){
        return this.Model.find({
            product_shop: shopId,
            isDraft: true
        }).populate('product_shop','name email -_id')
        .sort({updatedAt: -1})
        .skip(skip)
        .limit(limit)
        .lean().exec()
    }

    pulishProductByProductId(shopId, product_id){
        const filter = {_id : product_id, product_shop : shopId}
        const update = {isPublish: true, isDraft: false}
        const option = {new: true}
        return this.Model.findOneAndUpdate(filter, update, option).lean()
        
    }
    unPulishProductByProductId(shopId, product_id){
        const filter = {_id : product_id, product_shop : shopId}
        const update = {isPublish: false, isDraft: true}
        const option = {new: true}
        return this.Model.findOneAndUpdate(filter, update, option).lean()
        
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
class FurnitureRepository extends ProductRepository{
    constructor(){
        super({
            Model: furniture
        })
    }
    
}
module.exports = {
    ProductRepository,
    ClothingRepository,
    ElectronicRepository,
    FurnitureRepository
}