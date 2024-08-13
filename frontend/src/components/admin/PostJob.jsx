import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import axios from "axios";
import { BASIC_URL, JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: 0,
    location: "",
    jobType: "",
    experienceLevel: 0,
    position: 0,
    company: "",
  });
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, company: selectedCompany._id });
  };

  const { mutate: postJob, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const response = await axios.post(
          `${BASIC_URL}${JOB_API_END_POINT}/createJob`,
          input,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(response.data);

        if (response.status === 200) {
          toast.success(response.data.message);
          navigate("/admin/jobs");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  const handlePostJob = (e) => {
    e.preventDefault();
    postJob();
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form
          onSubmit={handlePostJob}
          className="p-8 max-w-4xl border border-gray-50 shadow-md rounded-md w-full my-5">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={input.title}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={input.description}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Input
                type="text"
                name="requirements"
                id="requirements"
                value={input.requirements}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                type="number"
                name="salary"
                id="salary"
                value={input.salary}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                name="location"
                id="location"
                value={input.location}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="jobType">Job Type</Label>
              <Input
                type="text"
                name="jobType"
                id="jobType"
                value={input.jobType}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="experienceLevel">Experience</Label>
              <Input
                type="number"
                name="experienceLevel"
                id="experienceLevel"
                value={input.experienceLevel}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                type="number"
                name="position"
                id="position"
                value={input.position}
                onChange={handleInputChange}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => {
                      return (
                        <SelectItem
                          key={company._id}
                          value={company?.name.toLowerCase()}>
                          {company.name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
          {isPending ? (
            <Button className="w-full bg-main-001 hover:bg-main-002 mt-4">
              <Loader2Icon className="animate-spin" /> Posting...
            </Button>
          ) : (
            <Button className="w-full bg-main-001 hover:bg-main-002 mt-4">
              Post job
            </Button>
          )}

          {companies.length === 0 && (
            <div className="flex items-center justify-center gap-2">
              <p className="text-sm text-center text-red-500 font-semibold">
                *Please create company before posting job
              </p>
              <Link to="/admin/companies/create">
                <p className="text-sm text-blue-400 font-semibold underline underline-offset-1">
                  New Company
                </p>
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
