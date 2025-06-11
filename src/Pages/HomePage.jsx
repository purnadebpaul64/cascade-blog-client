import React from "react";
import HeroSection from "../Components/HomePageComponents/HeroSection";
import NewsLatterSection from "../Components/NewsLatterSection";
import BlogTips from "../Components/HomePageComponents/BlogTips";
import TrendingTopic from "../Components/HomePageComponents/TrendingTopic";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <BlogTips></BlogTips>
      <TrendingTopic></TrendingTopic>
      <NewsLatterSection></NewsLatterSection>
    </div>
  );
};

export default HomePage;
