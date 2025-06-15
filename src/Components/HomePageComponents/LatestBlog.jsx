import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Sparkles } from "lucide-react";
import axios from "axios";
import SingleBlogCard from "./SingleBlogCard";
import { AuthContext } from "../../Providers/AuthProviders";
const LatestBlog = () => {
  const [loading, setLoading] = useState(true);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const { user } = use(AuthContext);
  const [wishlistIds, setWishlistIds] = useState([]);
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios(
          `${import.meta.env.VITE_API_URL}/latest-blogs`
        );
        setLatestBlogs(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const latestBlogsData = axios(`${import.meta.env.VITE_API_URL}/latest-blogs`);
  // console.log(latestBlogsData);

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.email) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/wishlist/${user.email}`
      );
      const ids = response.data.map((blog) => blog._id);
      setWishlistIds(ids);
    };

    fetchWishlist();
  }, [user]);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-800 via-gray-900 to-slate-800 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl"
          animate={floatingVariants.animate}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-purple-400/20 rounded-full blur-2xl"
          animate={{
            ...floatingVariants.animate,
            transition: { ...floatingVariants.animate.transition, delay: 1 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>
      {/* //// */}
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      {/* ///// */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={titleRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-lg"
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div>
              <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            </div>
            Fresh Content
          </motion.div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Recent Blog Posts
          </h2>
          <motion.p
            className="text-xl text-white/80 max-w-3xl mx-auto backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover our latest articles covering technology, design, and
            lifestyle topics.
          </motion.p>
        </motion.div>
        {/* //////// */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {loading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="space-y-4 p-4 rounded-xl bg-white/10 border border-white/10 animate-pulse"
                >
                  <div className="skeleton h-48 w-full rounded-xl bg-white/20"></div>
                  <div className="skeleton h-4 w-3/4 bg-white/20"></div>
                  <div className="skeleton h-4 w-1/2 bg-white/20"></div>
                  <div className="skeleton h-4 w-full bg-white/20"></div>
                </div>
              ))
            : latestBlogs.map((blog, index) => (
                <motion.div
                  key={blog._id}
                  variants={cardVariants}
                  layout
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SingleBlogCard
                    blog={blog}
                    index={index}
                    isWishlistedByUser={wishlistIds.includes(blog._id)}
                  />
                </motion.div>
              ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestBlog;
