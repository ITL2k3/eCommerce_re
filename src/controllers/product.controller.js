const { CREATED } = require("../core/success.response")
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
}


module.exports = new ProductController