'use strict'

const { default: mongoose } = require("mongoose")

const connectString = `mongodb://127.0.0.1:27017/shopDEV`
mongoose.connect(connectString).then(_ => console.log('Connected Mongodb Success'))
.catch(err => console.log(`Error Connect`,err))

module.exports = mongoose