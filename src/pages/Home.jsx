import React from "react";
import Hero from "../components/Hero";
import LatestCollectin from "../components/LatestCollectin";
import BestSeller from "./BestSeller";
import OurPolicy from "./OurPolicy";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollectin />
      <BestSeller />
      <OurPolicy />
    </div>
  );
};

export default Home;
