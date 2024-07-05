const { CREATED, SuccessResponse } = require("../core/success.response")
const ProductFactory = require("../services/product.service")

class ProductController {  
    createProduct = async (req,res,next) => {
        new CREATED({
            message: "create Success",
            metadata: await ProductFactory.createProduct(req.body.product_type,{
                ...req.body,
                product_shop: req.user.userId
                })
        }).send(res)
    }
    searchProductByName = async (req,res,next) => {
        new SuccessResponse({
            message: "get Success",
            metadata: await ProductFactory.searchProductByName(req.params)
        }).send(res)
    } 

    getAllPublicProduct = async (req,res,next) => {
        new SuccessResponse({
            message: "get Success",
            metadata: await ProductFactory.getAllPublicProduct()
        }).send(res)
    }
    getAllDraftProduct = async (req,res,next) => {
        new SuccessResponse({
            message: "get Success",
            metadata: await ProductFactory.getAllDraftsForShop(req.user.userId)
        }).send(res)
    }
    publishProductByShop = async (req,res,next) => {
        new SuccessResponse({
            message: 'public Success',
            metadata: await ProductFactory.pulishProductForShop(req.user.userId, req.params.id)
        }).send(res)
    }
    unPublishProductByShop = async (req,res,next) => {
        new SuccessResponse({
            message: 'unpublic Success',
            metadata: await ProductFactory.unPulishProductForShop(req.user.userId, req.params.id)
        }).send(res)
    }
}


module.exports = new ProductController