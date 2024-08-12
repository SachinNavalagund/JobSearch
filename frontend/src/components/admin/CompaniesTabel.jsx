import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";
import { useSelector } from "react-redux";
import useGetAllCompanies from "@/hooks/useGetAllCompanies";
import { useNavigate } from "react-router-dom";

const CompaniesTabel = () => {
  const navigate = useNavigate();
  useGetAllCompanies();
  const { companies } = useSelector((store) => store.company);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent registered compaines</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companies?.length === 0 ? (
            <span>You haven't registered any company yet.</span>
          ) : (
            <>
              {companies?.map((company) => (
                <tr key={company._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={company?.logo} />
                    </Avatar>
                  </TableCell>
                  <TableCell>{company?.name}</TableCell>
                  <TableCell>{company?.createdAt.split("T")[0]}</TableCell>
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
                              navigate(`/admin/companies/${company._id}`)
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

export default CompaniesTabel;
