import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function Login(req, res) {
    const { email, password } = req.body;  
    // console.log(email + " " + )

    try {
        const user = await User.findOne({email}).select("+password");
        
        if(!user) {
            return res.status(400).json({message: "User credentials not valid"});
        }

        const match = await bcrypt.compare(password, user.password);
        if(!match) {
            return res.status(400).json({message: "Password is incorrect"});
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "2h"});

        return res.status(200).json({message: "Login successful", token});

    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

async function Signup (req, res) {
    try{
        const {name, username, email, password, confirmPassword} = req.body;
        const user = await User.findOne({email});

        if(user) {
            return res.status(400).json({message: "User already exists. Please Login"});
        }

        if(password !== confirmPassword) {
            return res.status(400).json({message: "Both the passwords are not matching"});
        }

        const crypted_password = await bcrypt.hash(password, 10);

        const newUser = new User({name, username, email, password: crypted_password});
        await newUser.save();
        
        const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: "2h"});

        return res.status(200).json({message: "User added successfully", token});

    }catch(err) {
        return res.status(400).json({message: `User couldnt be added due to ${err.message}`});
    }
}

export {Login, Signup};