import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
function Jobs() {
  //const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const { allUserJobs, searchedQuery } = useSelector((store) => store.job);
  //temp
  const [filterJob, setFilterJobs] = useState(allUserJobs);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allUserJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allUserJobs);
    }
  }, [allUserJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-12">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJob.length <= 0 ? (
            <span>Jobs are not found</span>
          ) : (
            <div className="flex-1 h-[88hv] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJob.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
