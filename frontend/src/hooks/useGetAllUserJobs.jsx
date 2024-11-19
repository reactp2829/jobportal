import { setAllUserJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllUserJobs = () => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job)
    useEffect(()=>{
        const fetchAllUserJobs = async () => {
            try {
                const res = await axios.get(`http://localhost:8010/api/v1/job/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllUserJobs(res.data.data));
                }
            } catch (error) {
                console.log(error); 
            }
        }
        fetchAllUserJobs();
    },[])
}

export default useGetAllUserJobs