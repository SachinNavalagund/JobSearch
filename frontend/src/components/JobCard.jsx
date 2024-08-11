import React from "react";
import { Badge } from "./ui/badge";

const JobCard = ({ job }) => {
  return (
    <div className="bg-white p-5 rounded-md shadow-xl cursor-pointer hover:scale-105 transition hover:ease-in-out delay-100">
      <div>
        <p className="text-lg font-medium">{job?.company?.name}</p>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <p className="font-bold text-lg my-2">{job?.title}</p>
        <p className="font-base text-sm text-gray-500">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-orange-500 font-bold" variant="ghost">
          {job?.position}
        </Badge>
        <Badge className="text-slate-500 font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-green-500 font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCard;
