'use strict'
const {mongoose : model, Schema, Types, default: mongoose} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Keys'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keySchema = new Schema({
    userId:{
        type:Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true,
        
    },
    RefreshToken:{
        type:Array,
        default: []
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keySchema);