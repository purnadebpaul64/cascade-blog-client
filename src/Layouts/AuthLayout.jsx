import React from "react";
import { Outlet } from "react-router";
import bgimg from "../assets/image.webp";
import animationData from "../assets/animation.json";
import Lottie from "lottie-react";

const AuthLayout = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-b from-gray-950 via-gray-900 to-slate-900 min-h-screen p-2">
      <div className="col-span-1 flex justify-center items-center">
        <Outlet></Outlet>
      </div>
      <div
        className="col-span-1 bg-cover bg-center h-full w-full rounded-2xl flex justify-center items-center hidden md:flex "
        style={{ backgroundImage: `url(${bgimg})` }}
      >
        <div className="w-100 h-100">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
