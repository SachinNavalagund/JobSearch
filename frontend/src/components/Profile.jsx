import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTabel from "./AppliedJobsTabel";
import UpdateProfileModel from "./UpdateProfileModel";
import { useSelector } from "react-redux";

const skills = ["Html", "CSS", "JavaScript", "TailwindCss", "React"];
const isResume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl my-5 p-8 ">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto ||
                  "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg&uid=R154277991&ga=GA1.1.1454524316.1714732943&semt=ais_hybrid"
                }
                alt="Profile"
              />
            </Avatar>
            <div>
              <p className="text-xl font-semibold">{user?.fullName}</p>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="text-right"
            onClick={() => setOpen(true)}>
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <p className="font-bold my-2">Skills</p>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length === 0 ? (
              <span>No skills</span>
            ) : (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index} className=" bg-main-001 hover:bg-main-002">
                  {item}
                </Badge>
              ))
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={user?.profile.resume}
              className="text-main-001 w-full  hover:underline cursor-pointer">
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>NA</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <p className="font-bold text-lg my-5">Applied Jobs</p>
        <AppliedJobsTabel />
      </div>
      <UpdateProfileModel open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
