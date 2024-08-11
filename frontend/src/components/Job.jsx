import React from "react";

import { Bookmark } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgo = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (24 * 60 * 60 * 1000));
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-50 ">
      <div className="flex">
        <p className="mr-auto text-sm text-gray-500">
          {daysAgo(job?.createdAt) === 0
            ? "Today"
            : `${daysAgo(job?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://www.polymtl.ca/calendrier/sites/calendrier.amigow2020.polymtl.ca/files/googlelogo.jpg" />
          </Avatar>
        </Button>
        <div>
          <p className="text-xl font-bold">{job?.company?.name}</p>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <p className="font-semibold text-lg my-2">{job?.title}</p>
        <p className="text-sm text-gray-600">{job?.description}</p>
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

      <div className="flex items-center gap-4 mt-5">
        <Button
          variant="outine"
          className="border"
          onClick={() => navigate(`/description/${job._id}`)}>
          Details
        </Button>
        <Button className="bg-main-001 hover:bg-main-002">Save </Button>
      </div>
    </div>
  );
};

export default Job;
