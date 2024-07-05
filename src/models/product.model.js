'use strict'
const {mongoose : model, Schema, Types, default: mongoose} = require('mongoose'); // Erase if already required
const slugify = require('slugify')
const DOCUMENT_NAME = {
    PRODUCT: "Product",
    CLOTH: "Cloth",
    ELECTRONIC: "Electronic",
    FURNITURE: "Furniture"
}
const COLLECTION_NAME = {
    PRODUCT: "Products",
    CLOTH: "Clothes",
    ELECTRONIC: "Electronics",
    FURNITURE: "Furnitures"
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
    product_slug: String,
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
    },
    product_ratingsAverage: {
        type: Number,
        default: 4.5,
        min: [1,'Rating must above 1.0'],
        max: [5, 'Rating must be above 5.0'],
        set: (val) => Math.round(val *10)/10
    },
    product_variations: {
        type: Array,
        default: []
    },
    isDraft: {type: Boolean, default: true, index: true, select: false},
    isPublish: {type: Boolean, default: false, index: true, select: false},


    
}, {
    timestamps: true,
    collection: COLLECTION_NAME.PRODUCT
});
//create index
productSchema.index({
    product_name: "text" 
})

//define middleware: runs before .save()
productSchema.pre('save', function(next){
    this.product_slug = slugify(this.product_name, {lower: true})
    next()
})









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

var furnitureSchema = new Schema({
    manufacturer:  {type: String, require: true},
    size: String,
    material: String,
    product_shop: {
        type: Schema.Types.ObjectId, ref: 'Shop'
    },
},{
    collection: COLLECTION_NAME.FURNITURE,
    timestamps: true
})

//Export the model
module.exports = {
    product: mongoose.model(DOCUMENT_NAME.PRODUCT, productSchema),
    electronic: mongoose.model(DOCUMENT_NAME.ELECTRONIC, electronicSchema),
    clothing: mongoose.model(DOCUMENT_NAME.CLOTH,clothingSchema),
    furniture: mongoose.model(DOCUMENT_NAME.FURNITURE,furnitureSchema)
}
