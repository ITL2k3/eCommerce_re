const _ =  require('lodash')
const crypto = require('crypto')
const createRandKeys = () => {
    const { privateKey, publicKey} = crypto.generateKeyPairSync('rsa',{
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    })
    return {privateKey, publicKey}
}

const getInfoData = ({fields =[], object = {}}) => {
    return  _.pick(object, fields)
}


module.exports = {
    createRandKeys,
    getInfoData
}