const {Router} = require('express')
const { registerUser, registerAdmin } = require('../controllers/auth.controller')
const authRouter = Router()

authRouter.post('/register', registerUser)
authRouter.post('/register/admin', registerAdmin)
authRouter.post('/login')
authRouter.post('/apikey')
authRouter.get('/profile')


module.exports = {
    authRouter : authRouter
}