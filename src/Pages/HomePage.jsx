import React from "react";
import HeroSection from "../Components/HomePageComponents/HeroSection";
import NewsLatterSection from "../Components/NewsLatterSection";
import BlogTips from "../Components/HomePageComponents/BlogTips";
import TrendingTopic from "../Components/HomePageComponents/TrendingTopic";
import BlogCategory from "../Components/HomePageComponents/BlogCategory";
import LatestBlog from "../Components/HomePageComponents/LatestBlog";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <div>
      <Helmet>
        <title>Home | CascadeBlog</title>
      </Helmet>
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
