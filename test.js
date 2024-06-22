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
class classofsomething {
  #privatevar;
  constructor(){
  this.#privatevar = 5
  }
  getPrivatevar = () => {
    return this.#privatevar
  }


}

classofsomething temp = new classofsomething()
console.log(temp.getPrivatevar())
// console.log(crypto.randomBytes(64).toString('hex'))
