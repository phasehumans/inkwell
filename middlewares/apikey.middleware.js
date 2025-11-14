const { ApiKeyModel } = require("../models/apikeys.model")
const crypto = require('crypto')


async function apikeyMiddleware (req, res, next){
    const key = req.headers.apikey

    if(!key){
        return res.status(401).json({
            message : "API Key is required"
        })
    }

    const hashed = crypto.createHash("sha256").update(key).digest("hex")

    const keyDoc = await ApiKeyModel.findOne({
        key : hashed,
        active : true
    })

    if (!keyDoc) {
      return res.status(401).json({
        message : "Invalid API Key"
      })
    }

    req.apiKeyOwner = keyDoc.createdby;
    next();

}


module.exports = {
    apikeyMiddleware : apikeyMiddleware
}