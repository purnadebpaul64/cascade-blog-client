import { Calendar, Clock, User } from "lucide-react";
import React, { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Providers/AuthProviders";

const BlogDetailPage = () => {
  const { user } = use(AuthContext);
  console.log(user);

  const blogData = useLoaderData();
  const {
    title,
    photo,
    category,
    email,
    createdAt,
    blogDetails,
    addedUser,
    shortDetails,
  } = blogData;

  const isOwner = user?.email === email;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800 relative overflow-hidden ">
      <div className="w-11/12 md:w-8/12 mx-auto space-y-10">
        <div className="badge px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-md font-semibold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
          {category}
        </div>
        <div>
          <h1 className="font-bold text-5xl leading-15">{title}</h1>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-400">
            {shortDetails}
          </h2>
        </div>
        <div className="flex items-center space-x-6 text-slate-500 mb-8">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span>{addedUser}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <span>June 14, 2025</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>8 min read</span>
          </div>
        </div>
        <div className="">
          <img
            className="object-cover rounded-2xl shadow-lg h-96 w-full"
            src={photo}
            alt=""
          />
        </div>
        <div>
          <p className="text-lg leading-10 text-gray-300">{blogDetails}</p>
        </div>
        <div>
          {isOwner && (
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded">
              Update Blog
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogDetailPage;
