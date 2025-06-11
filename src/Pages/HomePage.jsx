import React from "react";
import HeroSection from "../Components/HomePageComponents/HeroSection";
import NewsLatterSection from "../Components/NewsLatterSection";
import BlogTips from "../Components/HomePageComponents/BlogTips";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <BlogTips></BlogTips>
      <NewsLatterSection></NewsLatterSection>
    </div>
  );
};

export default HomePage;
