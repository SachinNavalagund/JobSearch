import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASIC_URL, USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [signupFormData, setSignupFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.auth);

  const onChangeEvent = (event) => {
    const { name, value } = event.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const onChangeFileEvent = (event) => {
    setSignupFormData({ ...signupFormData, file: event.target.files?.[0] });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fullName", signupFormData.fullName);
    formData.append("email", signupFormData.email);
    formData.append("phoneNumber", signupFormData.phoneNumber);
    formData.append("password", signupFormData.password);
    formData.append("role", signupFormData.role);
    if (signupFormData.file) {
      formData.append("file", signupFormData.file);
    }
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${BASIC_URL}${USER_API_END_POINT}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        navigate("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto ">
        <form
          onSubmit={onSubmit}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <p className="font-bold text-xl mb-5">Sign Up</p>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullName"
              placeholder="Alex"
              value={signupFormData.fullName}
              onChange={onChangeEvent}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="alex@gmail.com"
              value={signupFormData.email}
              onChange={onChangeEvent}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="+91 9078456123"
              value={signupFormData.phoneNumber}
              onChange={onChangeEvent}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={signupFormData.password}
              onChange={onChangeEvent}
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={signupFormData.role === "student"}
                  onChange={onChangeEvent}
                  className=" cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={signupFormData.role === "recruiter"}
                  onChange={onChangeEvent}
                  className=" cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className=" cursor-pointer"
                onChange={onChangeFileEvent}
              />
            </div>
          </div>{" "}
          {loading ? (
            <Button className="w-full my-4 bg-main-001 hover:bg-main-002">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-main-001 hover:bg-main-002">
              Sign up
            </Button>
          )}
          <span>
            Already have an account?
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-600 hover:font-semibold underline underline-offset-2 ">
              {" "}
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
