import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Hero from "./Hero";
import CatagoryCarousel from "./CatagoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <Navbar />
      <Hero />
      <CatagoryCarousel />
      <LatestJob />
      <Footer />
    </div>
  );
};

export default Home;
