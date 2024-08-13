import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { allJobs, searchedJob } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedJob) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedJob.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedJob.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedJob.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedJob]);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-[20%]">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span>Currently no Jobs available</span>
          ) : (
            <div className="flex-1 h-[90vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 xl:grid-cols-3 md:grid-cols-2 gap-4">
                {filterJobs.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
