import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function LatestJobs() {
  //const num = [1,2,3,4,5,6,7,8]
  const { allUserJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 pt-1 p-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#db3d19]">Latest & Top</span>Job Opening
      </h1>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-3 gap-4 mt-4"
      >
        {allUserJobs.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          allUserJobs
            ?.slice(0, 6)
            .map((job) => <LatestJobCards key={job._id} job={job} />)
        )}
      </motion.div>
    </div>
  );
}
export default LatestJobs;
