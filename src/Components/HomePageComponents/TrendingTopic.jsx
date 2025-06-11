import {
  TrendingUp,
  ArrowRight,
  Calendar,
  Hash,
  Sparkles,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const trendingTopics = [
  {
    id: 1,
    title: "AI in Web Development",
    description:
      "How artificial intelligence is revolutionizing the way we build websites",
    trend: "+45%",
    posts: 127,
    lastUpdated: "2 hours ago",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    glowColor: "shadow-purple-500/30",
  },
  {
    id: 2,
    title: "Sustainable Design",
    description: "Eco-friendly design practices that are gaining popularity",
    trend: "+32%",
    posts: 89,
    lastUpdated: "4 hours ago",
    color: "bg-gradient-to-r from-green-500 to-teal-500",
    glowColor: "shadow-green-500/30",
  },
  {
    id: 3,
    title: "Remote Work Culture",
    description: "The evolution of workplace dynamics in the digital age",
    trend: "+28%",
    posts: 156,
    lastUpdated: "6 hours ago",
    color: "bg-gradient-to-r from-blue-500 to-indigo-500",
    glowColor: "shadow-blue-500/30",
  },
  {
    id: 4,
    title: "Minimalist Lifestyle",
    description:
      "Simplifying life through intentional living and mindful consumption",
    trend: "+22%",
    posts: 94,
    lastUpdated: "8 hours ago",
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    glowColor: "shadow-orange-500/30",
  },
];

const TrendingTopic = () => {
  const [hoveredTopic, setHoveredTopic] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      {/* Animated background patterns */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 right-20 w-40 h-40 from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
          animate={floatingVariants.animate}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-2xl"
          animate={{
            ...floatingVariants.animate,
            transition: { ...floatingVariants.animate.transition, delay: 1.5 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            },
          }}
        />
      </div>
      {/* ////// */}
      {/* Hexagon pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>
      {/* //// */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* // */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-lg"
            whileHover={{
              scale: 1.05,
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TrendingUp className="w-4 h-4 mr-2 text-cyan-400" />
            </motion.div>
            What's Hot Right Now
            <motion.div
              className="ml-2 w-2 h-2 bg-red-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
          <motion.h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trending Topics
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Stay ahead of the curve with the most popular and engaging topics in
            our community.
          </motion.p>
        </motion.div>
        {/* // */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {trendingTopics.map((topic, index) => (
            <motion.div
              key={topic.id}
              variants={cardVariants}
              whileHover={{ y: -8, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onMouseEnter={() => setHoveredTopic(topic.id)}
              onMouseLeave={() => setHoveredTopic(null)}
            >
              <div
                className={`group hover:shadow-2xl ${topic.glowColor} transition-all duration-700 cursor-pointer overflow-hidden backdrop-blur-lg bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 h-full rounded-lg shadow-sm`}
              >
                <div className="relative flex flex-col space-y-1.5 p-6">
                  <motion.div
                    className={`absolute inset-0 ${topic.color} opacity-20 blur-xl`}
                    whileHover={{ opacity: 0.3 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className={`w-4 h-4 rounded-full ${topic.color.replace(
                          "bg-gradient-to-r",
                          "bg-gradient-to-r"
                        )} shadow-lg border border-white`}
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <div className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300 leading-none tracking-tight ">
                          {topic.title}
                        </div>
                      </motion.div>
                    </div>
                    <motion.div
                      className="flex items-center space-x-1 text-green-400 font-semibold backdrop-blur-sm bg-white/10 px-2 py-1 rounded-lg border border-white/20"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <TrendingUp className="w-4 h-4" />
                      </motion.div>
                      <span className="text-sm">{topic.trend}</span>
                    </motion.div>
                  </div>

                  {/* Floating indicator */}
                  <AnimatePresence>
                    {hoveredTopic === topic.id && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Zap className="w-3 h-3 text-white" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative p-6 pt-0">
                  <motion.p
                    className="text-white/70 mb-4 leading-relaxed group-hover:text-white/90 transition-colors duration-300"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {topic.description}
                  </motion.p>

                  <div className="flex items-center justify-between text-sm text-white/60 mb-4">
                    <div className="flex items-center space-x-4">
                      <motion.div
                        className="flex items-center space-x-1 hover:text-cyan-400 transition-colors backdrop-blur-sm bg-white/5 px-2 py-1 rounded-lg border border-white/10"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Hash className="w-4 h-4" />
                        <span>{topic.posts} posts</span>
                      </motion.div>
                      <motion.div
                        className="flex items-center space-x-1 hover:text-green-400 transition-colors backdrop-blur-sm bg-white/5 px-2 py-1 rounded-lg border border-white/10"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{topic.lastUpdated}</span>
                      </motion.div>
                    </div>
                  </div>

                  <motion.div
                    animate={
                      hoveredTopic === topic.id
                        ? { x: 16, scale: 1.05 }
                        : { x: 0, scale: 1 }
                    }
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <button className="btn btn-ghost group-hover:bg-white/20 group-hover:text-cyan-400 transition-all duration-500 backdrop-blur-sm border border-white/20 hover:border-cyan-400 text-white/80">
                      Explore Topic
                      <motion.div
                        className="ml-2"
                        whileHover={{ x: 8 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrendingTopic;
