const {z, email} = require('zod')

const registerSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string(),
    avatar : z.string().url()
})




module.exports = {
    registerSchema : registerSchema
}