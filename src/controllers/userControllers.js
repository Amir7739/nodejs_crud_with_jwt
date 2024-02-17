const user = require('../models/user');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const SECRET_KEY = "appzlogicmobilitysolutionpvtltd";
let tokenBlacklist = [];

const signup = async(req,res) => {
    const{username,email,password,confirmPass} = req.body;

    // checking password is matching or not
    if(password !== confirmPass) {
        res.status(400).json({message: "Password don't match"})
    }

     // Check if email is valid
     if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
      }

      // Check if email already exists
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        const existingUser = await userModel.findOne({email: email});
        if(existingUser) {
            return res.status(400).json({message:"user already exists"})
        }

        // hashing
        const hashedPass = await bcrypt.hash(password,10);

        const result = await userModel.create({
            username: username,
            email: email,
            password: hashedPass,
            
        })

        // payload
        const token = jwt.sign({email:result.email,id: result._id},SECRET_KEY);
        res.status(201).json({user: result,token: token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
        
    }
}

const signin = async(req,res) => {
    const{email,password} = req.body;
    try {
        const existingUser = await userModel.findOne({email: email});
        if(!existingUser) {
            return res.status(404).json({message:"user not found"})
        }

        const matchPass = await bcrypt.compare(password,existingUser.password);
        if(!matchPass) {
            return res.status(404).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({email:existingUser.email,id: existingUser._id},SECRET_KEY);
        res.status(201).json({user: existingUser,token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
}

// logout functionality
const logout = async (req, res) => {
    try {
        const authorizationHeader = req.header('Authorization');
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const token = authorizationHeader.replace('Bearer ', '');
        tokenBlacklist.push(token);
        res.status(200).send({ message: 'Logout successful.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong.' });
    }
};


module.exports = { signup, signin, logout };