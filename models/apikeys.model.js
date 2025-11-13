const mongoose = require('mongoose')
const Schema = mongoose.Schema

const apiKeySchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
      },
    
      key: {
        type: String,
        required: true,
        unique: true
      },
    
      active: {
        type: Boolean,
        default: true
      }
    
}, {
    timestamps : true
})


const ApiKeyModel = mongoose.model('apikey', apiKeySchema)

module.exports = {
    ApiKeyModel : ApiKeyModel   
}