import React from "react";
import JobCard from "./JobCard";
import { useSelector } from "react-redux";

const LatestJob = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold flex items-center justify-center gap-4">
        <span className="text-main-001">Latest </span> Job Openings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 mx-auto">
        {allJobs.length !== 0 ? (
          allJobs.slice(0, 6).map((job) => <JobCard key={job._id} job={job} />)
        ) : (
          <p className="text-center text-xl font-bold text-red-200">
            No jobs avalibale{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default LatestJob;
