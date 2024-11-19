import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllUserJobs from "@/hooks/useGetAllUserJobs";
import { motion } from "framer-motion";

function Browse() {
  useGetAllUserJobs();
  const dispatch = useDispatch();
  const { searchedQuery, allUserJobs } = useSelector((store) => store.job);
  const jobs = [1, 2, 3, 4];
  // for clean up serached query
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""))
    };
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-10">
        <h1 className="font-bold text-xl my-5">
          Search Result ({allUserJobs.length})
        </h1>
        <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-4 my-4">
          {allUserJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

export default Browse;
