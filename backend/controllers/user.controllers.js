/*
business login
user registration 
user login 
*/

import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/Datauri.js";
import cloudinary from "../utils/Cloudinary.js";

export const register = async (req, res)=>{
    try {
        const { fullname, email, phoneNumber, password, role} = req.body;        
        //if fields are empty
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json(new ApiResponse(200,null,"Somthing went wrong",false))
        }
        // file 
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudinaryResponse = await cloudinary.uploader.upload(fileUri.content); 

        // if user email is already exist 
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json(new ApiResponse(400, null, "User already exist with this email",false))
        }
        
        //conver password hash
        const hashedPassword = await bcrypt.hash(password, 10)

        // store data 
        await User.create({
            fullname,
            email,
            phoneNumber,
            password : hashedPassword,
            role,
            profile : {
                profilePhoto : cloudinaryResponse.secure_url,
            }
        })
        return res.status(200).json(
            new ApiResponse(200,null, "Account created Successfully!", true)
        )
    } catch (error) {
        console.log(error);
                
    }
}

// user login 

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password.",
                success: false,
            })
        };
        // check role is correct or not
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success: false
            })
        };

        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//logout 
export const logout = async(req, res)=>{
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json(new ApiResponse(200, null, "Logged out Successfully!", true))
    } catch (error) {
        console.log(error);        
    }
}

// profile update 

export const updateProfile  = async(req, res)=>{
    try {
        const{fullname,email, phoneNumber, bio, skills} = req.body;
        // if(!fullname || !email || !phoneNumber || !bio || !skills){
        //     res.status(400).json(new ApiResponse(400, null, "Somthing Went wrong", false))
        // }
        //console.log(fullname,email, phoneNumber, bio, skills);
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content); 
        
        
        // skills- converted string into array 
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",")
        }
        
        // take userid for update purpose 
        const userId  = req.id 
        // take user object 
        let user = await User.findById(userId)
        //console.log('cookies data ', user);
        

        if(!user){
            res.status(404).json(new ApiResponse(404, null, "User is not found", false))
        }
        // user update here 
        // user.fullname = fullname,
        // user.email = email,
        // user.phoneNumber = phoneNumber,
        // user.profile.bio = bio,
        // user.profile.skills = skillsArray

        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber) user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname; // save the original file name
        }

        // save 
        await user.save();

        //for return data here 
        user =  {
            _id: user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role:user.role,
            profile:user.profile
        }
        return res.status(201).json(new ApiResponse(201,user, "User data updated successfully!",true))
    } catch (error) {
        console.log(error);  
    }
}

