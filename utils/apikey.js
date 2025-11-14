const crypto = require('crypto')

function generateAPI (){
    return crypto.randomBytes(32).toString("hex");
}

module.exports = {
    generateAPI : generateAPI
}