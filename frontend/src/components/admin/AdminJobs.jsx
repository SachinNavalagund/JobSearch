import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";
import { setSerachAdminJob } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");

  useEffect(() => {
    dispatch(setSerachAdminJob(input));
  }, [input]);
  return (
    <>
      <Navbar />
      <div className=" max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="bg-main-001 hover:bg-main-002"
            onClick={() => navigate("/admin/jobs/create")}>
            Post Job
          </Button>
        </div>
        <AdminJobTable />
      </div>
    </>
  );
};

export default AdminJobs;
