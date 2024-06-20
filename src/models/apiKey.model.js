'use strict'
const {mongoose : model, Schema, Types, default: mongoose} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'apiKeys'
const COLLECTION_NAME = 'apiKeys'
// Declare the Schema of the Mongo model
var apiKeySchema = new Schema({
    key:{
        type: String,
        required: true,
        ref: 'Shop'
    },
    status:{
        type:String,
        default:true,
        
    },
    permissions:{
        type:[String],
        required: true,
        enum: ['0000','1111','2222']
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, apiKeySchema);