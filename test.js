const mongoose = require('mongoose')
const {Schema} = mongoose
const connectString = `mongodb://127.0.0.1:27017/test`
mongoose.connect(connectString).then(_ => console.log('Connected Mongodb Success'))
.catch(err => console.log(`Error Connect`,err))

const sg = {
  temp: 'doc',
  tempp: "dov22"
}

console.log(sg.temp)