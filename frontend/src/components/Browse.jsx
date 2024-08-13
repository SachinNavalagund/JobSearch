import React, { useEffect } from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedJob } from "@/redux/jobSlice";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedJob(""));
    };
  });
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <p className="text-xl font-bold lg:my-10 md:my-6 my-4">
          Search Results ({allJobs.length})
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => {
            return <Job job={job} key={job._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
