import React from "react";
import Navbar from "./shared/Navbar";
import Hero from "./Hero";
import CatagoryCarousel from "./CatagoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Home = () => {
  useGetAllJobs();
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
