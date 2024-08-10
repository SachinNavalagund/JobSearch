import React from "react";
import Job from "./Job";
import Navbar from "./shared/Navbar";

const randomJobs = [1, 2, 3];

const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <p className="text-xl font-bold lg:my-10 md:my-6 my-4">
          Search Results ({randomJobs.length})
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {randomJobs.map((item, index) => {
            return <Job key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
