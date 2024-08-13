import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import useGetAllAdminJobs from "@/hooks/useGetAllAdminJobs";

const AdminJobTable = () => {
  const navigate = useNavigate();
  useGetAllAdminJobs();

  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterAdminJob, setFilterAdminJob] = useState(allAdminJobs);

  useEffect(() => {
    const filteredAdminJob =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }

        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            ?.toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterAdminJob(filteredAdminJob);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterAdminJob?.length === 0 ? (
            <span>No Jobs found</span>
          ) : (
            <>
              {filterAdminJob?.map((job) => (
                <tr key={job._id}>
                  <TableCell>{job?.company?.name}</TableCell>
                  <TableCell>{job?.title}</TableCell>
                  <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                  <TableCell className=" cursor-pointer">
                    <Popover>
                      <PopoverTrigger>
                        <MoreHorizontal />
                      </PopoverTrigger>
                      <PopoverContent className="w-[100px]">
                        <div className="flex items-center gap-2 cursor-pointer w-full  ">
                          <button
                            className="w-full flex gap-2 items-center  "
                            onClick={() =>
                              navigate(`/admin/companies/${job._id}`)
                            }>
                            <Edit2 className="w-4 text-green-400" />
                            <span>Edit</span>
                          </button>
                        </div>
                        {/* <div className="flex items-center gap-2  cursor-pointer w-full ">
                          <Trash className="w-4 text-red-400" />
                          <span>Delete</span>
                        </div> */}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </tr>
              ))}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
