import React from "react";
import Navbar from "./shared/Navbar";
import Hero from "./Hero";
import CatagoryCarousel from "./CatagoryCarousel";
import LatestJob from "./LatestJob";
import Footer from "./Footer";

const Home = () => {
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
