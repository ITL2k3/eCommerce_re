const {ProductRepository,
    ClothingRepository,
    ElectronicRepository, 
    FurnitureRepository} = require('../Repositories/ProductRepo');
const { BadRequestError, InternalServerError } = require('../core/error.response');
const { getInfoData } = require('../utils');

const productHelper = new ProductRepository()
const clothingHelper = new ClothingRepository()
const electronicHelper = new ElectronicRepository()
const furnitureHelper = new FurnitureRepository()

class ProductFactory{

    static productRegistry = {}

    static productRegister (type, classRef) {
        this.productRegistry[type] = classRef
    }
   
    static async createProduct(type, payload){
      
        const productClass = this.productRegistry[type]
        
        if(!productClass) throw new BadRequestError(`Invalid product_type ${type}`)
        const newProduct = await new productClass(payload).createProduct()
        return getInfoData({
                fields: ['product_name','product_thumb'
                    ,'product_description', 'product_price',
                    'product_quantity', 'product_type',
                    'product_shop','product_attributes',
                    'product_ratingsAverage'
                ], object : newProduct})
        
        
    }

    static async searchProductByName({keyWord}){
       
        const regExpString = new RegExp(keyWord)
        return await productHelper.searchProduct(keyWord)



    }

    static async getAllPublicProduct(){ 
        return await productHelper.getAllPublic()
    }

    static async getAllDraftsForShop(shopId){
        if(!shopId) throw new InternalServerError()
        return await productHelper.getAllDraftByShopId(shopId)
    }

    static async pulishProductForShop(shopId, productId){
        if(!shopId || !productId) throw new InternalServerError()
        const updatedProduct = await productHelper.pulishProductByProductId(shopId,productId)
        if(!updatedProduct) throw new BadRequestError("Bad Request")
        return updatedProduct
        

    }
    static async unPulishProductForShop(shopId, productId){
        if(!shopId || !productId) throw new InternalServerError()
        const updatedProduct = await productHelper.unPulishProductByProductId(shopId,productId)
        if(!updatedProduct) throw new BadRequestError("Bad Request")
        return updatedProduct

    }

}


class Product {
    constructor({
        product_name, 
        product_thumb, 
        product_description,
        product_price,
        product_quantity,
        product_type,
        product_shop,
        product_attributes
    }){
        this.product_name = product_name, 
        this.product_thumb = product_thumb , 
        this.product_description = product_description,
        this.product_price = product_price,
        this.product_quantity = product_quantity,
        this.product_type = product_type,
        this.product_shop = product_shop,
        this.product_attributes = product_attributes
    }
    async createProduct(product_id){
        
        return await productHelper.create({
            ...this,
            _id: product_id
        })
    }
}

class Clothing extends Product {

    async createProduct(){
        const newClothing = await clothingHelper.create({
            ...this.product_attributes,
            product_shop : this.product_shop
         })
        if(!newClothing) throw new InternalServerError()

        const newProduct = await super.createProduct(newClothing._id)
        if(!newProduct) throw new InternalServerError()
        return newProduct
    }
}

class Electronic extends Product {
    async createProduct(){
        
        const newElectronic = await electronicHelper.create({
           ...this.product_attributes,
           product_shop : this.product_shop
        })

        if(!newElectronic) throw new InternalServerError()
        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct) throw new InternalServerError()
        return newProduct
    }
}


class Furniture extends Product {
    async createProduct(){
        
        const newFurniture = await furnitureHelper.create({
           ...this.product_attributes,
           product_shop : this.product_shop
        })
    
        if(!newFurniture) throw new InternalServerError()
        const newProduct = await super.createProduct(newFurniture._id)
        if(!newProduct) throw new InternalServerError()
        return newProduct
    }
}

ProductFactory.productRegister("Electronic", Electronic)
ProductFactory.productRegister("Furniture", Furniture)
ProductFactory.productRegister("Clothing", Clothing)

module.exports =  ProductFactory