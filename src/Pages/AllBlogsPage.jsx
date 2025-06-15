import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles, Search } from "lucide-react";
import axios from "axios";
import SingleBlogCard from "../Components/HomePageComponents/SingleBlogCard";
import { AuthContext } from "../Providers/AuthProviders";
import { Helmet } from "react-helmet-async";

const categories = [
  "All",
  "Technology",
  "Design",
  "Lifestyle",
  "Business",
  "Food & Health",
  "Travel",
];

const AllBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);
  const [wishlistIds, setWishlistIds] = useState([]);

  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Debounce searchTerm -> search
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchTerm.trim());
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`, {
        params: {
          search,
          category: selectedCategory,
        },
      });
      setBlogs(res.data);
    } catch (err) {
      setError("Failed to fetch blogs. Please try again.");
      console.error("Error fetching blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [search, selectedCategory]);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/wishlist/${user.email}`
        );
        // Convert _id to string to avoid issues
        const ids = response.data.map((blog) => blog._id.toString());
        setWishlistIds(ids);
      } catch (err) {
        console.error("Error fetching wishlist", err);
      }
    };

    fetchWishlist();
  }, [user]);

  return (
    <>
      <Helmet>
        <title>All Blogs | CascadeBlog</title>
      </Helmet>
      <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
        {/* Animated background mesh */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
            animate={{
              y: [-20, 20, -20],
              transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl"
            animate={{
              y: [-20, 20, -20],
              transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              },
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Header */}
          <motion.div
            ref={titleRef}
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
          >
            <motion.div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              <p>Cascade Blogs</p>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
              All Blogs
            </h2>
            <p className="text-md sm:text-xl text-white/80 max-w-3xl mx-auto backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10">
              Share your knowledge, insights, and unique perspective with a
              global audience.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center bg-white/10 border border-white/20 rounded-full px-4 py-2 w-full md:w-1/2">
              <Search className="text-white/60 mr-2" />
              <input
                type="text"
                placeholder="Search blog titles..."
                className="bg-transparent w-full focus:outline-none text-white placeholder:text-white/60"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 backdrop-blur-sm"
            >
              {categories.map((cat) => (
                <option className="bg-black" key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Blog Cards */}
          {loading ? (
            <p className="text-white/70 text-center col-span-full">
              Loading...
            </p>
          ) : error ? (
            <p className="text-red-500 text-center col-span-full">{error}</p>
          ) : blogs.length === 0 ? (
            <p className="text-white/70 text-center col-span-full">
              No blogs found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <SingleBlogCard
                  key={blog._id}
                  blog={blog}
                  index={index}
                  isWishlistedByUser={wishlistIds.includes(blog._id.toString())}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default AllBlogsPage;
