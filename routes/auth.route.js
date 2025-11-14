const {Router} = require('express')
const { registerUser, registerAdmin, login, getProfile, generateApiKey } = require('../controllers/auth.controller')
const authRouter = Router()
const {authMiddleware} = require('../middlewares/auth.middleware')

authRouter.post('/register', registerUser)
authRouter.post('/register/admin', registerAdmin)
authRouter.post('/login', login)
authRouter.post('/apikey', authMiddleware, generateApiKey)
authRouter.get('/profile', authMiddleware, getProfile)


module.exports = {
    authRouter : authRouter
}