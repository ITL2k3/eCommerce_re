const mongoose = require('mongoose')
const {Schema} = mongoose
const connectString = `mongodb://127.0.0.1:27017/test`
// mongoose.connect(connectString).then(_ => console.log('Connected Mongodb Success'))
// .catch(err => console.log(`Error Connect`,err))

// const crypto = require('crypto')
// const newSchema = new Schema({
//   user:{
//     type: String,
//     required: true,
  
//   },
//   conssa: {
//     type: String,
//     required: true
//   },
//   wtf: {
//     type: Number
//   }
// })
// const temp = mongoose.model('tempa', newSchema)

// const test1= new temp({
//   user: "Haha",
//   conssa: "hehe",
//   wtf: 123
// })
// temp.findOne({
//   user: 'Haha'
// }).select('-user -conssa').then((data) => {
//   data.save()
//   console.log(data)
// })


//  temp.findOne(test1)

// console.log(crypto.randomBytes(64).toString('hex'))
// const HEADER = {
//   API_KEY : 'x-api-key',
//   AUTHORIZATION: 'authorization',
//   CLIENT_ID: 'x-client-id',
//   REFRESH_TOKEN: 'refresh-token'

// }

// const obj = {
//   heasd : "API_KEY",
//   "killa" : "esd",
//   "ho ho ho": "asdad"
// }
// delete obj.heasd
const func = (obj ) => {
  obj.vale = 9
}
let obj = {
  vale: 4
}

func({obj})
console.log(obj)