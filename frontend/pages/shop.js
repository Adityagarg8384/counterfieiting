'use client'
import React from "react";
import HeaderSlider from "../components/headerslider";
import HomeProducts from "../components/homeproduct";
import Banner from "../components/banner";
import NewsLetter from "../components/newsletter";
import FeaturedProduct from "../components/featuredproduct";
import Navbar2 from "../components/navbar2";
import Footer from "../components/footer";

const Home = () => {
  return (
    <div className="bg-[#14161a] min-h-screen flex flex-col">
      <Navbar2 />
      <div className="px-6 md:px-16 lg:px-32 flex-grow">
        <HeaderSlider />
        <HomeProducts />
        <FeaturedProduct />
        <Banner />
        <NewsLetter />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
