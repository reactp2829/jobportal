import {ApiResponse} from "../utils/ApiResponse.js";
import {Application} from "../models/application.models.js";
import {Job} from "../models/job.models.js";
export const applyJob = async(req, res)=>{
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if(!jobId){
            return res.status(404).json(
                new ApiResponse(404, null, "Job Id is missing", false)
            )
        }

         // check if the user has already applied for the job
         const existingApplication = await Application.findOne({job :jobId,applicant:userId});
         if(existingApplication){
            return res.status(400).json(
                new ApiResponse(400, null, "You have already applied for this jobs", false)
            )
         }

         // check jobs are exist or not 
        const jobExist = await Job.findById(jobId)
        if(!jobExist){
            return res.status(404).json(
                new ApiResponse(404, null, "Job not found", false)
            )
        }
        // applied for job 
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        });

        // save into job table 
        jobExist.applications.push(newApplication._id)
        await jobExist.save();
        return res.status(201).json(
            new ApiResponse(201,null, "Job applied successfully.",true)
        )

    } catch (error) {
        console.log(error);    
    }
}

//get applied job 
export const getAppliedJobs = async(req, res)=>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path : "job",
            option : {sort: {createdAt : -1}},
            populate:{
                path : "company",
                option : {sort : {createdAt : -1}}
            }
        })
        if(!application){
            return res.status(404).json(
                new ApiResponse(404, null, " No Application found", false)
            )
        }
        return res.status(201).json(
            new ApiResponse(201, application, "Application data", true)
        )
    } catch (error) {
        console.log(error); 
    }
}// how many users are applied for jobs 

export const getApplicants = async(req, res)=>{
    try {
        const adminId = req.id;
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options:{sort:{createdAt: -1}},
            populate:{
                path : "applicant"
            }
        })
        if(!job){
            return res.status(404).json(
                new ApiResponse(404, null, " Job not found", false)
            )
        }
        return res.status(201).json(
            new ApiResponse(201, job, "Job and Applicant data", true)
        )
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus = async(req, res)=>{
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(404).json(
               new ApiResponse(404, null , "Status not found", false)
            )
        }
        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId})
        if(!application){
            return res.status(404).json(
               new ApiResponse(404, null , "Application not found", false)
            )
        }
        //update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(201).json(
            new ApiResponse(201, null, "Status updated successfully.", true)
        )
    } catch (error) {
        console.log(error);
    }
}