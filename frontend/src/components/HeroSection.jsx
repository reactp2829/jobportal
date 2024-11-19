import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#db3d19] font-medium">
          No.1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search Apply & <br /> Get Your{" "}
          <span className="text-[#db3d19]">Dream Job</span>
        </h1>
        <p>
          <span className="text-[#db3d19] text-lg">Post your resume</span> - It only takes a few seconds<br/>
           <span className="text-[#db3d19] text-lg"> Post a job today</span> and
          connect with quality candidates
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto ">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="border-none outline-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#db3d19] hover:bg-[#db3d19]"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
