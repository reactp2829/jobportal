import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const  useGetAllCompanies = ()=> {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log('hello', res);
        
        if (res.data.success) {
          //console.log("singlejOb",res.data);
          dispatch(setCompanies(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }    
    }
    fetchAllCompany();
  }, []);
}

export default useGetAllCompanies;
