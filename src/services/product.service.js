const {ProductRepository,
    ClothingRepository,
    ElectronicRepository } = require('../Repository/ProductRepo');
const { BadRequestError, InternalServerError } = require('../core/error.response')
const {product, electronic, clothing} = require('../models/product.model')

const productHelper = new ProductRepository()
const clothingHelper = new ClothingRepository()
const electronicHelper = new ElectronicRepository()

class ProductFactory{
   
    static async createProduct(type, payload){
        switch(type){
            case "Clothing": return new Clothing(payload).createProduct(); break;
            case "Electronic": return  new Electronic(payload).createProduct(); break;
            default: throw new InternalServerError(`Invalid Product Types ${type}`)

        }
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
        console.log(newElectronic)
        if(!newElectronic) throw new InternalServerError()
        const newProduct = await super.createProduct(newElectronic._id)
        if(!newProduct) throw new InternalServerError()
        return newProduct
    }
}

module.exports =  ProductFactory