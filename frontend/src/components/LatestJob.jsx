import React from "react";
import JobCard from "./JobCard";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const LatestJob = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h2 className="text-4xl font-bold flex items-center justify-center gap-4">
        <span className="text-main-001">Latest </span> Job Openings
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 mx-auto">
        {jobs.slice(0, 6).map((item, index) => (
          <JobCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default LatestJob;
