import React from "react";

import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useSelector } from "react-redux";

const AppliedJobsTabel = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  return (
    <div>
      <Table>
        <TableCaption>List of applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length === 0 ? (
            <p className="text-xl mt-4 text-red-500 font-semibold">
              You haven't applied any job
            </p>
          ) : (
            allAppliedJobs.map((item) => (
              <TableRow key={item?._id}>
                <TableCell>{item?.createdAt.split("T")[0]}</TableCell>
                <TableCell>{item?.job?.title}</TableCell>
                <TableCell>{item?.job?.company?.name}</TableCell>
                <TableCell>
                  <Badge
                    className={`${
                      item?.status === "rejected"
                        ? "bg-red-500"
                        : item?.status === "pending"
                        ? "bg-gray-500"
                        : "bg-green-500"
                    }  `}>
                    {item?.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobsTabel;
