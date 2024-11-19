import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const  useGetCompanyById = (compId)=> {
  const dispatch = useDispatch();
  const {user} = useSelector(store=>store.auth);
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${compId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          //console.log("singlejOb",res.data);
          dispatch(setSingleCompany(res.data.data));
        }
      } catch (error) {
        console.log(error);
      }    
    }
    fetchSingleCompany();
  }, [dispatch, compId]);
}

export default useGetCompanyById;
