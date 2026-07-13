const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/sendEmail')

const generateToken = (id) => {
    return jwt.sign({id},
        process.env.JWT_SECRET,
        {
            expiresIn:"10d"
        }
    )
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        const userAlreadyRegister = await User.findOne({ email })
        if (userAlreadyRegister) {
            return res.status(400).json({
                message: "User already Exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await User.create({name, email, password: hashedPassword})

        if (user) {
            
            const message = `
            Hello ${name},
            Welcome to E-Commerce! 🎉
            Thank you for creating your account.
            `;
            
            await sendEmail(email, "Welcome", message)
            
            res.status(200).json({
                message: "User registered successfully",
                user:{
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user._id)
                }
            })
        } 
        else{
            res.status(400).json({
                message: "Invalid data"
            })
        }
    } catch (error) {
    console.error(error);

    res.status(500).json({
        message: error.message
    });
}
}

const loginUser = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({email})

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        }
        else{
            res.status(400).json({
                message: "Wrong credentials"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
    });
}
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password')
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Server error"})
    }
}

module.exports = { registerUser, loginUser, getUsers }