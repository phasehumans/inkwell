const { UserModel } = require("../models/users.model")
const { registerSchema } = require("../utils/validation")
const bcrypt = require('bcrypt')

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
        return res.status(400)
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



module.exports = {
    registerUser : registerUser,
    registerAdmin : registerAdmin,
    
}