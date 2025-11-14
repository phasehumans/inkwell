const {z, email} = require('zod')

const registerSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    email : z.string().email(),
    password : z.string().min(6).max(20),
    avatar : z.string().url()
})

const loginSchema = z.object({
    email : z.string().email(),
    password : z.string().min(6).max(20)
})



module.exports = {
    registerSchema : registerSchema,
    loginSchema : loginSchema
}