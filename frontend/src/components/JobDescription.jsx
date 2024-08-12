import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { setSingleJob } from "@/redux/jobSlice";
import axios from "axios";
import {
  APPLY_JOB_API_END_POINT,
  BASIC_URL,
  JOB_API_END_POINT,
} from "@/utils/constant";
import { toast } from "sonner";

const JobDescription = () => {
  const params = useParams();
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const jobId = params.id;

  const dispatch = useDispatch();

  //Applying job
  const { mutate: applyJobs } = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `${BASIC_URL}${APPLY_JOB_API_END_POINT}/apply/${jobId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setIsApplied(true);
        const updatedJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedJob));
        toast.success(response.data.message);
      }
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  //Job details
  const { mutate: getSingleJob } = useMutation({
    mutationFn: async () => {
      const response = await axios.get(
        `${BASIC_URL}${JOB_API_END_POINT}/getjob/${jobId}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsApplied(
          response.data.applications.some(
            (application) => application.applicant === user?._id
          )
        );
      }

      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setSingleJob(data));
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    getSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-xl">{singleJob?.title}</p>
            <div className="flex items-center gap-2 mt-4">
              <Badge className="text-orange-500 font-bold" variant="ghost">
                {singleJob?.position}
              </Badge>
              <Badge className="text-slate-500 font-bold" variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className="text-green-500 font-bold" variant="ghost">
                {singleJob?.salary}Lpa
              </Badge>
            </div>
          </div>

          <Button
            disabled={isApplied}
            onClick={isApplied ? null : applyJobs}
            className={`rounded-lg ${
              isApplied
                ? "bg-orange-300 hover:bg-orange-400 cursor-not-allowed text-black"
                : "bg-main-001 hover:bg-main-002"
            }`}>
            {isApplied ? "Already applied" : "Apply Now"}
          </Button>
        </div>
        <p className="border-b-2 border-b-gray-300   py-4 text-lg font-bold">
          {singleJob?.description}
        </p>
        <div className="my-4">
          <p className="font-bold my-1">
            Role:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.title}
            </span>
          </p>
          <p className="font-bold my-1">
            Location:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.location}
            </span>
          </p>
          <p className="font-bold my-1">
            Description:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.description}
            </span>
          </p>
          <p className="font-bold my-1">
            Experience:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.experienceLevel} yrs
            </span>
          </p>
          <p className="font-bold my-1">
            Salary:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.salary} LPA
            </span>
          </p>
          <p className="font-bold my-1">
            Total Applicants:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.applications?.length}
            </span>
          </p>
          <p className="font-bold my-1">
            Posted Date:
            <span className="pl-4 font-normal text-gray-800">
              {singleJob?.createdAt.split("T")[0]}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
