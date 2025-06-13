import React from "react";
import HeroSection from "../Components/HomePageComponents/HeroSection";
import NewsLatterSection from "../Components/NewsLatterSection";
import BlogTips from "../Components/HomePageComponents/BlogTips";
import TrendingTopic from "../Components/HomePageComponents/TrendingTopic";
import BlogCategory from "../Components/HomePageComponents/BlogCategory";
import LatestBlog from "../Components/HomePageComponents/LatestBlog";

const HomePage = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <LatestBlog></LatestBlog>
      <BlogCategory></BlogCategory>
      <BlogTips></BlogTips>
      <TrendingTopic></TrendingTopic>
      <NewsLatterSection></NewsLatterSection>
    </div>
  );
};

export default HomePage;
