const apiKeyModel = require("../models/apiKey.model")
const crypto = require('crypto')

const findByKey = async (Key) => {
    const objKey = await apiKeyModel.findOne({
        key: Key
    })
    return objKey
}

const createApiKey = async () => {
    const newKey = await apiKeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: '0000'})
    return newKey
}

module.exports = {
    findByKey,
    createApiKey
}