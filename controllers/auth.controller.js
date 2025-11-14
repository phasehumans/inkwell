const { email } = require("zod")
const { UserModel } = require("../models/users.model")
const { registerSchema, loginSchema } = require("../utils/validation")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


const registerUser = async (req, res) => {
    const parseData = registerSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            message : "invalid fields",
            error : parseData.error
        })
    }

    const {firstName, lastName, email, password, avatar} = parseData.data

    const userExist = await UserModel.findOne({
        email : email
    })

    if(userExist){
        return res.status(409).json({
            message : "email already exists"
        })
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
        await UserModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword,
            avatar : avatar,
            role : "user"
        })

        res.status(201).json({
            message : "sign-up completed"
        })


    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }

    
}

const registerAdmin = async (req, res) => {
    const parseData = registerSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            message : "invalid fields",
            error : parseData.error
        })
    }

    const {firstName, lastName, email, password, avatar} = parseData.data

    const adminExist = await UserModel.findOne({
        email : email,
        role : "admin"
    })

    if(adminExist){
        return res.status(409).json({
            message : "email already exists"
        })
    }

    try {
        const hashPassword = await bcrypt.hash(password, 5)
        await UserModel.create({
            firstName : firstName,
            lastName : lastName,
            email : email,
            password : hashPassword,
            avatar : avatar,
            role : "admin"
        })

        res.status(201).json({
            message : "sign-up completed (admin)"
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
}

const login = async (req, res) => {
    const parseData = loginSchema.safeParse(req.body)

    if(!parseData.success){
        return res.status(400).json({
            message : "invalid fields",
            error : parseData.error
        })
    }

    const user = await UserModel.findOne({
        email : email
    })

    if(!user){
        return res.status(404).json({
            message : "user doesnot found"
        })
    }

    try {
        const passwordCompare = await bcrypt.compare(password, user.password)
    
        if(passwordCompare){
            const token = jwt.sign({
                _id : user.id,
                role : user.role
            }, process.env.JWT_SECRET)
    
            res.status(200).json({
                message : "login-in successfull",
                token : token
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "server error",
            error : error.message
        })
    }
}

const getProfile = async (req, res ) => {
    try {
        const userid = req.userid
        const role = req.role
    
        const profileData = await UserModel.findOne({
            _id : userid,
            role : role
        })
    
        if(!profileData){
            return res.status(404).json({
                message : "user not found"
            })
        }
    
        res.status(200).json({
            message : "user details",
            details : profileData
        })
    } catch (error) {
        res.status(500).json({
            message : "internal server error",
            error : error.message
        })
    }
}


module.exports = {
    registerUser : registerUser,
    registerAdmin : registerAdmin,
    login : login

}