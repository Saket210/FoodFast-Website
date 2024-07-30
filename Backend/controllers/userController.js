import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const userLogin = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json({success: false, message: "User doesn't exist"});
        } 
        const match = await bcrypt.compare(password,user.password);
        if (!match) {
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = createUserToken(user._id);
        res.json({success: true, token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"});
    }
}

const createUserToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const userRegister = async (req,res) => {
    const {name, password, email} = req.body;
    try {
        const exist = await userModel.findOne({email});
        if(exist){
            return res.json({success:false,message:"User already exist"});
        }

        //validating email and password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter Valid emailId"})
        }
        if(password.length < 8){
            return res.json({success:false,message:"Enter strong password"})
        }

        //Encrypting password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: encryptedPassword
        })

        const user = await newUser.save()
        const token= createUserToken(user._id)

        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {userLogin, userRegister};