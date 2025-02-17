require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet= require('helmet')
const compression = require('compression')
const app = express()


//init middlewares
app.use(express.json())
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
//init db
require('./dbs/init.mongodb')
// const { countConnect, checkOverload } = require('./helpers/check.connect')

// checkOverload()
//init routes
app.use('', require('./routes'))
//handling error



module.exports = app    