import React from "react";
import { FileText, TrendingUp } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router";

const categories = [
  {
    id: 1,
    name: "Technology",
    description:
      "Latest trends in web development, AI, and software engineering",
    postCount: 45,
    color: "from-blue-500 to-cyan-500",
    icon: FileText,
  },
  {
    id: 2,
    name: "Design",
    description: "UI/UX design principles, tools, and creative inspiration",
    postCount: 32,
    color: "from-purple-500 to-pink-500",
    icon: TrendingUp,
  },
  {
    id: 3,
    name: "Lifestyle",
    description: "Work-life balance, productivity tips, and personal growth",
    postCount: 28,
    color: "from-green-500 to-emerald-500",
    icon: FileText,
  },
  {
    id: 4,
    name: "Business",
    description:
      "Entrepreneurship, marketing strategies, and industry insights",
    postCount: 19,
    color: "from-orange-500 to-red-500",
    icon: TrendingUp,
  },
  {
    id: 5,
    name: "Travel",
    description: "Adventure stories, travel guides, and cultural experiences",
    postCount: 15,
    color: "from-indigo-500 to-purple-500",
    icon: FileText,
  },
  {
    id: 6,
    name: "Food & Health",
    description: "Nutrition tips, recipes, and wellness advice",
    postCount: 22,
    color: "from-teal-500 to-green-500",
    icon: TrendingUp,
  },
];

const BlogCategory = () => {
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={titleRef}
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 bg-clip-text text-transparent mb-6">
            Explore Categories
          </h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover content organized by topics that interest you the most.
          </motion.p>
        </motion.div>
        {/* ////// */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="group hover:shadow-xl transition-all duration-300 border-1 shadow-lg overflow-hidden h-full rounded-lg hover:bg-white/5">
                  <div className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <motion.div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
                          {category.name}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <span className="font-medium">
                            {category.postCount} posts
                          </span>
                        </div>
                      </div>
                    </div>

                    <motion.p
                      className="text-muted-foreground mb-6 line-clamp-2"
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {category.description}
                    </motion.p>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Link
                        className={`btn w-full bg-gradient-to-r ${category.color} hover:shadow-lg transition-all duration-300`}
                      >
                        Explore {category.name}
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogCategory;
