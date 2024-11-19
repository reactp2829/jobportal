import axios from "axios";
import { useEffect } from "react";
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch } from "react-redux";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const useGetAppliedJobs = ()=>{
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAppliedJobs = async () =>{
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true})
                if(res.data.success){
                    // list of applied jobs here
                    dispatch(setAllAppliedJobs(res.data.data));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAppliedJobs();
    },[])
}
export default useGetAppliedJobs;