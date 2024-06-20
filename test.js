const mongoose = require('mongoose')
const {Schema} = mongoose
const connectString = `mongodb://127.0.0.1:27017/test`
mongoose.connect(connectString).then(_ => console.log('Connected Mongodb Success'))
.catch(err => console.log(`Error Connect`,err))

const crypto = require('crypto')
// const newSchema = new Schema({
//   user:{
//     type: [String],
//     required: true,
//     enum: ['0000','1111','2222']
//   }
// })
function test(...apm){
  console.log(apm)
  apm.value+=1
  
}
function test2({apm}){
  apm = apm +1
  
}
let obj = {
  value : 10
}
test(obj)
console.log(obj)
// console.log(crypto.randomBytes(64).toString('hex'))
