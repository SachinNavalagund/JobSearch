import React from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const JobDescription = () => {
  const isApplied = false;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-xl">Frontend Developer</p>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-orange-500 font-bold" variant="ghost">
                12 Position
              </Badge>
              <Badge className="text-slate-500 font-bold" variant="ghost">
                Full Time
              </Badge>
              <Badge className="text-green-500 font-bold" variant="ghost">
                23Lpa
              </Badge>
            </div>
          </div>

          <Button
            disabled={isApplied}
            className={`rounded-lg ${
              isApplied
                ? "bg-orange-300 hover:bg-orange-400 cursor-not-allowed text-black"
                : "bg-main-001 hover:bg-main-002"
            }`}>
            {isApplied ? "Already applied" : "Apply Now"}
          </Button>
        </div>
        <p className="border-b-2 border-b-gray-300   py-4 text-lg font-bold">
          Job Description
        </p>
        <div className="my-4">
          <p className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">
              Frontend Developer
            </span>
          </p>
          <p className="font-bold my-1">
            Location:
            <span className="pl-4 font-normal text-gray-800">Bengaluru</span>
          </p>
          <p className="font-bold my-1">
            Description:
            <span className="pl-4 font-normal text-gray-800">
              Need a developer with 2yaers of hands on experience in react and
              good knowledge of Javascript
            </span>
          </p>
          <p className="font-bold my-1">
            Experience:
            <span className="pl-4 font-normal text-gray-800">2 yrs</span>
          </p>
          <p className="font-bold my-1">
            Salary:
            <span className="pl-4 font-normal text-gray-800">12Lpa</span>
          </p>
          <p className="font-bold my-1">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">4</span>
          </p>
          <p className="font-bold my-1">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">07-08-2024</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
