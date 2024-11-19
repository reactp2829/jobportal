import React, { useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { useParams } from "react-router-dom";
import useGetSingleJob from "@/hooks/useGetSingleJob";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setSingleJob } from "@/redux/jobSlice";

function JobDescription() {
 
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  useGetSingleJob(jobId); // custom hook for single job
  const { singleJob } = useSelector((store) => store.job);
  const {user} = useSelector(store=>store.auth);
  const {isAppliedJob} = useSelector(store=>store.job);

  const [isApplied, setIsApplied] = useState(isAppliedJob)
  // apply job handler 
  const applyJobHandler = async () =>{
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials: true});
      if(res.data.success){
       // setIsApplied(true);// state value is update 
        dispatch(setIsApplied(true))
        // update tototal applicatant value 
        const updatedSingleJob = {...singleJob, applications:[...singleJob.applications, {applicant: user?._id}]}
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  } 
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 p-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-xl">{singleJob?.title}</h1>
            <div className="flex items-center gap-2 mt-4">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <Button
            className={`rounded-lg ${
              isApplied
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#db3d19] text-white hover:bg-[#db3d19]"
            }`}

            onClick = {isApplied ? null : applyJobHandler}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </div>
        <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
          Job Description : {singleJob?.description}
        </h1>
        <div className="my-4">
          <h1 className="font-bold my-1">
            Role:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Location:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Description:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Experience:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Salary:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Total Applicants:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </h1>
          <h1 className="font-bold my-1">
            Posted Date:{" "}
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default JobDescription;
