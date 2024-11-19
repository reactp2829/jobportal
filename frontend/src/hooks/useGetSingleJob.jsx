import { setIsAppliedJob, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const  useGetSingleJob = (jobId)=> {
  
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        console.log('singlejob', res.data.data);
        
        if (res.data.success) {
          //console.log("singlejOb",res.data);
          dispatch(setSingleJob(res.data.data));
          dispatch(setIsAppliedJob(res.data.data.applications?.some(application=>application.applicant === user?._id)));
        }
      } catch (error) {
        console.log(error);
      }    
    }
    fetchSingleJob();
  }, [jobId,dispatch, user?._id]);
}

export default useGetSingleJob;
