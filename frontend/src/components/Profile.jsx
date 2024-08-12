import React, { useRef, useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen, PencilIcon, Upload } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobsTabel from "./AppliedJobsTabel";
import UpdateProfileModel from "./UpdateProfileModel";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASIC_URL, USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";

const isResume = true;
const Profile = () => {
  const [open, setOpen] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const { user } = useSelector((store) => store.auth);
  const imageRef = useRef(null);

  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const { mutate: uploadProfilePhoto } = useMutation({
    mutationFn: async (formData) => {
      const response = await axios.patch(
        `${BASIC_URL}${USER_API_END_POINT}/profile/updateProfilePhoto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      console.log(response.data);

      return response.data;
    },
    onSuccess: (data) => {
      dispatch(setUser(data));
      toast.success("Profile photo updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const render = new FileReader();
      render.onload = () => {
        setPreviewPhoto(render.result);
      };
      render.readAsDataURL(selectedFile);
      setFile(selectedFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      console.log("No file selected.");
      return;
    }
    const formData = new FormData();

    formData.append("profilePhoto", file);
    uploadProfilePhoto(formData);
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl my-5 p-8 ">
        <div className="flex justify-between">
          <div className="flex items-center  gap-4">
            <div className="group ">
              <form onSubmit={handleSubmit}>
                <Avatar className="h-24 w-24 relative  cursor-pointer">
                  <AvatarImage
                    src={
                      previewPhoto ||
                      user?.profile?.profilePhoto ||
                      "https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?size=626&ext=jpg&uid=R154277991&ga=GA1.1.1454524316.1714732943&semt=ais_hybrid"
                    }
                    alt="Profile"
                    className=""
                  />
                </Avatar>
                <div className="w-8 h-8 bg-green-200 p-1 rounded-full absolute top-44 left-32 opacity-0  group-hover:opacity-100 cursor-pointer">
                  <PencilIcon
                    className="text-xl group-hover:opacity-100"
                    onClick={() => imageRef.current.click()}
                  />

                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    name="profilePhoto"
                    ref={imageRef}
                    onChange={handleImageChange}
                  />
                </div>
                {previewPhoto && (
                  <button
                    className="mt-4 bg-main-001 hover:bg-main-002 p-2 rounded-full absolute top-24 left-32 text-white"
                    type="submit">
                    <Upload />
                  </button>
                )}
              </form>
            </div>
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
              href={user?.profile?.resume}
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
