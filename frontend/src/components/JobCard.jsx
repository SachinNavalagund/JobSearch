import React from "react";
import { Badge } from "./ui/badge";

const JobCard = () => {
  return (
    <div className="bg-white p-5 rounded-md shadow-xl cursor-pointer hover:scale-105 transition hover:ease-in-out delay-100">
      <div>
        <p className="text-lg font-medium">Company Name</p>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <p className="font-bold text-lg my-2">Job Title</p>
        <p className="font-base text-sm text-gray-500">
          Description of a job title
        </p>
      </div>
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
  );
};

export default JobCard;
