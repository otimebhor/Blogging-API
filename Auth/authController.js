const jwt = require("jsonwebtoken");
const { UserModel } = require("../User/userModel")
require('dotenv').config()

const UserSignUp= async (req, res) => {
    try {
       const { email, first_name, last_name, password, gender } = req.body;
       // check is user exist
        const User = await UserModel.findOne({
            email: email
        });
    
        if (User) {
            return res.status(409).json({
                message: 'User already created',
            })
        }
         
        if (!email || !first_name || !last_name || !password || !gender) {
            return res.status(400).json({
                message: 'Kindly fill all necessary fields!'
            })
        }
        const user = await UserModel.create({
           first_name: first_name,
           last_name: last_name,
           email: email,
           password: password,
           gender: gender,
        });
    
        const token = await jwt.sign({ email: user.email, _id: user._id}, process.env.JWT_SECRET)
    
        return res.status(201).json({
            message: 'User created successfully',
            user,
            token
        }) 
    } catch (error) {
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }

}

const UserLogin = async (req, res) => {
    try {
       
        const { email, password } = req.body
    
        const user = await UserModel.findOne({
            email: email,
        });
    
        if (!user) {
            return res.status(404).json({
                message: 'User not found',
            }) 
        }
    
        const validPassword = await user.isValidPassword(password)
    
        if (!validPassword) {
            return res.status(422).json({
                message: 'Email or password is not correct',
            }) 
        }
    
        const token = await jwt.sign({ email: user.email, _id: user._id}, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' })
    
        return res.status(200).json({
            message: 'Login successful',
            user,
            token
        })
    } catch (error) {
       
        return res.status(500).json({
            message: 'Server Error',
            data: null
        })
    }
}



module.exports = { UserSignUp, UserLogin };