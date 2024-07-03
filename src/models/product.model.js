'use strict'
const {mongoose : model, Schema, Types, default: mongoose} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = {
    PRODUCT: "Product",
    CLOTH: "Cloth",
    ELECTRONIC: "Electronic"
}
const COLLECTION_NAME = {
    PRODUCT: "Products",
    CLOTH: "Clothes",
    ELECTRONIC: "Electronics"
}
// Declare the Schema of the Mongo model
var productSchema = new Schema({
    product_name:{
        type: String,
        required: true,
        
    },
    product_thumb:{
        type: String,
        required: true,
        
    },
    product_description: String,
    product_price: {
        type: Number,
        required: true
    },
    product_quantity:{
        type: Number,
        required: true
    },
    product_type:{
        type: String,
        required: true,
        enum: ['Electronic', 'Clothing', 'Furniture']
    },
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
    product_attributes: {
        type: Schema.Types.Mixed,
        required: true
    }
    
}, {
    timestamps: true,
    collection: COLLECTION_NAME.PRODUCT
});

var clothingSchema = new Schema({
    brand: {type: String, require: true},
    size: String,
    material: String,
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
},{
    collection: COLLECTION_NAME.CLOTH,
    timestamps: true
})

var electronicSchema = new Schema({
    manufacturer:  {type: String, require: true},
    model: String,
    version: String,
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
},{
    collection: COLLECTION_NAME.ELECTRONIC,
    timestamps: true
})

//Export the model
module.exports = {
    product: mongoose.model(DOCUMENT_NAME.PRODUCT, productSchema),
    electronic: mongoose.model(DOCUMENT_NAME.ELECTRONIC, electronicSchema),
    clothing: mongoose.model(DOCUMENT_NAME.CLOTH,clothingSchema)
}
