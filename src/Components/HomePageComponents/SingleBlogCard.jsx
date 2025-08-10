import {
  BookmarkPlus,
  Clock,
  Eye,
  Heart,
  Sparkles,
  Tag,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import axios from "axios";

const SingleBlogCard = ({ blog, index, isWishlistedByUser = false }) => {
  const { user } = use(AuthContext);
  const getCategoryColor = (category) => {
    switch (category) {
      case "Technology":
        return "from-blue-500 to-cyan-500";
      case "Business":
        return "from-blue-500 to-cyan-500";
      case "Design":
        return "from-purple-500 to-pink-500";
      case "Travel":
        return "from-purple-500 to-pink-500";
      case "Lifestyle":
        return "from-green-500 to-emerald-500";
      case "Food & Health":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const createdAt = blog.createdAt;
  const publishDate = new Date(createdAt);
  const currentDate = new Date();
  const diffTime = currentDate - publishDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // const [isWishlisted, setIsWishlisted] = useState(blog.isWishlisted || false);
  const [isWishlisted, setIsWishlisted] = useState(isWishlistedByUser);

  useEffect(() => {
    setIsWishlisted(isWishlistedByUser); // re-sync if parent updates
  }, [isWishlistedByUser]);

  const toggleWishlist = async (blogId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/wishlist`,
        {
          blogId,
          userEmail: user.email,
        }
      );

      setIsWishlisted(response.data.wished);
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  return (
    <div className="group hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-500 overflow-hidden shadow-lg backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 h-full rounded-lg text-[#121923]">
      <div className="p-6">
        <div className="relative overflow-hidden">
          <motion.img
            src={blog.photo}
            alt={blog.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.7 }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Enhanced Category Badge */}
          <motion.div
            className="absolute top-4 left-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div
              className={`flex items-center space-x-1 px-3 py-2 bg-gradient-to-r ${getCategoryColor(
                blog.category
              )} text-white text-sm font-medium rounded-full shadow-lg backdrop-blur-sm border border-white/20`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Tag className="w-3 h-3" />
              <span>{blog.category}</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="p-6 pt-0">
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>
        <motion.p
          className="text-white/70 mb-4 line-clamp-2 group-hover:text-white/90 transition-colors"
          initial={{ opacity: 0.7 }}
          whileHover={{ opacity: 0.9 }}
        >
          {blog.shortDetails}
        </motion.p>

        <div className="flex items-center justify-between text-sm text-white/60 mb-4">
          <motion.div
            className="flex items-center space-x-2 group-hover:text-cyan-300 transition-colors backdrop-blur-sm bg-white/5 px-2 py-1 rounded-lg border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <User className="h-4 w-4" />
            <span>{blog.addedUser}</span>
          </motion.div>
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-4 w-4" />
              <span>{`Published ${diffDays} days ago`}</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="flex items-center px-6 pb-6 pt-0">
        <div className="flex items-center justify-between w-full">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/blog-details/${blog._id}`}
              className="btn bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 shadow-lg hover:shadow-cyan-500/25 border border-white/20 backdrop-blur-sm rounded-xl"
            >
              Read Details
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <button
              onClick={() => toggleWishlist(blog._id)}
              className={`btn btn-outline btn-sm backdrop-blur-sm border-2 rounded-xl ${
                isWishlisted
                  ? "text-red-400 border-red-400 bg-red-400/10 hover:bg-red-400/20"
                  : "text-white/60 border-white/30 bg-white/5 hover:text-red-400 hover:border-red-400"
              }`}
            >
              <BookmarkPlus
                className={`h-4 w-4 transition-all duration-300 ${
                  isWishlisted ? "fill-current" : ""
                }`}
              />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogCard;
