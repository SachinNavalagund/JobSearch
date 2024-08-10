import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASIC_URL, USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${BASIC_URL}${USER_API_END_POINT}/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success(response.message || "Logout successfull");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/login");
      }
    } catch (error) {
      console.log("Somthing went wrong in logout:", error);
      toast.error("Somthing went wrong" || error.response.message);
    }
  };
  return (
    <nav className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Job<span className=" text-main-001">Search</span>
          </h1>
        </div>

        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
            <li>
              <Link to="/browse">Browse</Link>
            </li>
          </ul>

          {!user ? (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-main-001 hover:bg-main-002">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className=" cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex  flex-col  gap-2 ">
                  <div className="flex flex-col items-center justify-center">
                    <Avatar className=" w-20 h-20 cursor-pointer">
                      <AvatarImage
                        src={
                          user?.profile.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt="@shadcn"
                      />
                    </Avatar>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h4 className="font-medium">Sachin Navalagund</h4>
                    <p className="text-sm text-muted-foreground">
                      Full stack developer
                    </p>
                  </div>

                  <div className="flex-col mt-4 text-gray-600">
                    <Button variant="link" className="flex gap-2">
                      <User2 /> <Link to="/profile">View profile</Link>
                    </Button>
                    <Button
                      variant="link"
                      className="flex gap-2"
                      onClick={handleLogout}>
                      <LogOut /> Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
