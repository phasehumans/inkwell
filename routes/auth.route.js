const {Router} = require('express')
const { registerUser, registerAdmin, login } = require('../controllers/auth.controller')
const authRouter = Router()
const {authMiddleware} = require('../middlewares/auth.middleware')

authRouter.post('/register', registerUser)
authRouter.post('/register/admin', registerAdmin)
authRouter.post('/login', login)
authRouter.post('/apikey')
authRouter.get('/profile', authMiddleware, )


module.exports = {
    authRouter : authRouter
}