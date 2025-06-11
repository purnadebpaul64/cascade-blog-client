import React from "react";
import { useInView } from "react-intersection-observer";
import { Lightbulb, Target, TrendingUp, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const tips = [
  {
    icon: Lightbulb,
    title: "Write Compelling Headlines",
    description:
      "Your headline is the first thing readers see. Make it catchy, specific, and promise value. Use numbers, questions, or power words to grab attention.",
    color: "from-yellow-400 to-orange-500",
    glowColor: "shadow-yellow-500/25",
  },
  {
    icon: Target,
    title: "Know Your Audience",
    description:
      "Understanding your target audience is crucial. Research their pain points, interests, and preferred content formats to create resonating content.",
    color: "from-green-400 to-teal-500",
    glowColor: "shadow-green-500/25",
  },
  {
    icon: TrendingUp,
    title: "SEO Optimization",
    description:
      "Use relevant keywords naturally throughout your content. Focus on user intent and provide comprehensive, valuable information that answers questions.",
    color: "from-blue-400 to-purple-500",
    glowColor: "shadow-blue-500/25",
  },
  {
    icon: Users,
    title: "Engage Your Community",
    description:
      "Respond to comments, ask questions, and encourage discussions. Building a community around your blog increases loyalty and engagement.",
    color: "from-pink-400 to-red-500",
    glowColor: "shadow-pink-500/25",
  },
];

const BlogTips = () => {
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
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background mesh */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r  from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={floatingVariants.animate}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl"
          animate={{
            ...floatingVariants.animate,
            transition: { ...floatingVariants.animate.transition, delay: 2 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
      </div>
      {/* ============== */}
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

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
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <p>Expert Knowledge</p>
          </motion.div>
          <motion.h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Pro Blogging Tips
          </motion.h2>
          <motion.p
            className="text-xl text-white/80 max-w-2xl mx-auto backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Master the art of blogging with these expert tips and strategies
            that will help you create content that stands out.
          </motion.p>
        </motion.div>
        {/* === cards === */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -12, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className={`group hover:shadow-2xl ${tip.glowColor} transition-all duration-500 border shadow-lg backdrop-blur-lg bg-white/10 border-1 border-white/20 hover:bg-white/20 hover:border-white/30 h-full rounded-lg px-6 py-8`}
              >
                <div className="text-center pb-4">
                  <motion.div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${tip.color} rounded-full mb-4 mx-auto shadow-lg border-2 border-white`}
                    whileHover={{ scale: 1.25, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <tip.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <div className="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {tip.title}
                    </div>
                  </motion.div>
                </div>
                <div className="text-center">
                  <motion.p
                    className="text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {tip.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BlogTips;
