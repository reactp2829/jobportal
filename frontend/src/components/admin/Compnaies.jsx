import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompnaiesTable from "./CompnaiesTable";
import { useNavigate } from "react-router-dom";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

function Compnaies() {
   useGetAllCompanies();
   // for input search 
   const [input, setInput] = useState("");
   const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(()=>{
      //input seach value passed here 
      dispatch(setSearchCompanyByText(input))
    },[input])
   
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10 p-4">
        <div className="flex items-center justify-between my-5">
          <Input className="w-fit" 
          placeholder="Filter by Name" 
          onChange = {(e)=>setInput(e.target.value)}
          />
          <Button className="bg-[#db3d19] hover:bg-[#db3d19] text-white"
          onClick={()=>navigate("/admin/companies/create")}
          >
            New Company
          </Button>
        </div>
    
        <CompnaiesTable/>
      </div>
      <Footer />
    </div>
  );
}

export default Compnaies;
