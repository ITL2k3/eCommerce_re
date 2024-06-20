'use strict'
const { default: mongoose } = require("mongoose")
const {db: {host, name, port}} = require('../configs/config.mongodb')
const { countConnect } = require("../helpers/check.connect")
const config = require("../configs/config.mongodb")
const connectString = `mongodb://${host}:${port}/${name}`
console.log(connectString)

class Database{
    constructor(){
        this.connect()
    }

    connect(type = 'mongodb'){
        if(1 === 1){//moi truong dev, in query
            mongoose.set('debug', true)
            mongoose.set('debug', {color: true})
        }

        mongoose.connect(connectString, {maxPoolSize :100}).then(_ => console.log('Connected Mongodb Success PRO',countConnect()))
        .catch(err => console.log(`Error Connect`,err))
    }
    static getInstance() {
        if(!Database.instance){
            Database.instance = new Database()
        }
        console.log(countConnect())
        return Database.instance  
    }
}
const instanceMongodb = Database.getInstance()
module.exports = instanceMongodb