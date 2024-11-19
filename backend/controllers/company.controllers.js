//company data save into database 
// create update and delete 
import { ApiResponse } from "../utils/ApiResponse.js";
import {Company} from "../models/company.models.js"
import getDataUri from "../utils/Datauri.js";
import cloudinary from "../utils/Cloudinary.js";

export const registerCompany = async(req, res)=>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(401).json(new ApiResponse(401, null, "Company name is required.", false))
        }
        // check company with same name 
        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json(
                new ApiResponse(400, null, "You can't register same company", false)
            )
        }

        // create company
        let createCompany = await Company.create({
            name : companyName,
            userId : req.id
        }) 
        
        return res.status(200).json(
            new ApiResponse(200, createCompany, "Company is created Successfully !!",true)
        )
    } catch (error) {
        console.log(error);       
    }
}

// user created by company
export const getCompany = async(req, res)=>{
    try {
        const userId = req.id
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json(
                new ApiResponse(404, null, "Companies Not Fund", false)
            )
        }
        return res.status(200).json(
            new ApiResponse(200, companies, "", true)
        )
    } catch (error) {
        console.log(error);
    }
}

// get  company by ID 

export const getCompanyById = async(req, res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json(
                new ApiResponse(404, null, "Company is not found", false)
            )
        } 
        return res.status(200).json(new ApiResponse(200, company, "Company Data", true))
    } catch (error) {
        console.log(error);  
    }
}

export const updateCompany = async(req, res)=>{
    try {
        const {name, description, website, location } = req.body
         const file = req.file;
         const fileUri = getDataUri(file)
         const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
         const logo = cloudResponse.secure_url;
        //update data
        const updateData = {name, description, website, location, logo}
        
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, {new:true})
        if(!company){
            return res.status(404).json(
                new ApiResponse(404, null, "Company is not found", false)
            )
        }
        return res.status(200).json(
            new ApiResponse(200, company , "Company Updated Successfully ", true)
        )
    } catch (error) {
        console.log(error);
    }
}
