import React from "react";
import HeroSection from "../Components/HomePageComponents/HeroSection";
import NewsLatterSection from "../Components/NewsLatterSection";
import BlogTips from "../Components/HomePageComponents/BlogTips";
import TrendingTopic from "../Components/HomePageComponents/TrendingTopic";
import BlogCategory from "../Components/HomePageComponents/BlogCategory";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <BlogCategory></BlogCategory>
      <BlogTips></BlogTips>
      <TrendingTopic></TrendingTopic>
      <NewsLatterSection></NewsLatterSection>
    </div>
  );
};

export default HomePage;
