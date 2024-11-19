import { ApiResponse } from "../utils/ApiResponse.js";
import { Job } from "../models/job.models.js";

export const postJob = async(req, res) =>{
    try {
        const {title, description, requirements, salary, experience, location, jobType, position, companyId}= req.body;
        const userId  = req.id;
        if(!title || !description || !requirements || !salary || !experience || !location || !jobType || !position || !companyId){
            return res.status(401).json(
                new ApiResponse(401,null, "Somthing is missing", false)
            )
        }
        //create jobs 

        const job =  await Job.create({
            title,
            description, 
            requirements: requirements.split(","),
            salary: Number(salary),
            experienceLevel : experience,
            location,
            jobType,
            position,
            company : companyId,
            created_by : userId,
        })
        return res.status(201).json(
            new ApiResponse(201, job, "Job is Created Successfully", true)
        )
    } catch (error) {
        console.log(error);
    }
}

// get jobs 
export const getAllJobs  = async(req, res)=>{
    try {
        // filter data from urls 
        //url : http://localhost/jobs?keyword="mern" 
        const keyword = req.query.keyword || ""
        const query = {
            // i will consider here small or capital letters
            $or : [
                {title :{$regex:keyword, $options : "i"}},
                {description :{$regex:keyword, $options : "i"}},
            ]
        }
            //get data 
            //populate will gives company all info we can use more populate
            const jobs = await Job.find(query).populate({
                path: "company" 
            }).sort({createdAt: -1});
            if(!jobs){
                return res.status(404).json(
                    new ApiResponse(404, null, "Jobs are not founds", false)
                )
            }
            return res.status(200).json(
                new ApiResponse(200, jobs, "Jobs Data", true)
            )
    } catch (error) {
        console.log(error);
        
    }

}
//student
export const getJobById = async(req,res)=>{
    try {
        //get job id here 
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path : "applications"
        })
        if(!job){
            return res.status(404).json(
                new ApiResponse(404, null, "Jobs are not founds", false)
            )
        }
        return res.status(200).json(
            new ApiResponse(200, job, "Job Data", true)
        )
    } catch (error) {
        console.log(error);
        
    }
}

//admin created jobs 
export const getAdminJobs = async(req, res)=>{
    try {
        const adminUserId = req.id;
        //here we will get all user and comapny info
        const adminJobs = await Job.find({created_by :adminUserId}).populate({
            path : "company"
        }).populate({
            path : "created_by"
        });
        if(!adminJobs){
            return res.status(404).json(
                new ApiResponse(404,null, "Jobs are not found", false)
            )
        }
        return res.status(201).json(
            new ApiResponse(201, adminJobs, "Admin Created Jobs", true)
        )
    } catch (error) {
        console.log(error);   
    }
}
