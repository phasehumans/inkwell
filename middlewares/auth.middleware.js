const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


function authMiddleware (req, res, next){
    const token = req.headers.token

    try {
        const decodeData = jwt.verify(token, process.env.JWT_SECRET)
    
        if(decodeData){
            req.userid = decodeData.id
            req.role = decodeData.role
            next()
        }else{
            return res.status(403).json({
                message : "you are not singed in"
            })
        }

    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }

}

module.exports = {
    authMiddleware : authMiddleware
}