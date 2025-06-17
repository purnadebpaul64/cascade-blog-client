import { ArrowRight, Sparkles, Zap, TrendingUp } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroSection = () => {
  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background section */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-2xl"
          animate={floatingVariants.animate}
        />
        <motion.div
          className="absolute bottom-10 right-1/4 w-56 h-56 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full blur-3xl"
          animate={{
            ...floatingVariants.animate,
            transition: { ...floatingVariants.animate.transition, delay: 2 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-400/10 to-blue-400/10 rounded-full blur-3xl"
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
      {/* ======== */}
      {/* text section */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={heroRef}
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 shadow-lg"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <p>Latest insights & trends</p>
            <div className="ml-2 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full"></div>
          </motion.div>
          <motion.h1
            className="text-5xl leading-15 md:leading-20 sm:text-6xl md:text-7xl font-bold text-white mb-6"
            variants={itemVariants}
            whileHover={{ textShadow: "0 0 8px rgba(255,255,255,0.7)" }}
            transition={{ duration: 0.3 }}
          >
            Explore, Learn and Share Your Thoughts
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-white/80 leading-relaxed backdrop-blur-sm bg-white/5 p-4 mb-8 rounded-2xl border border-white/10"
            variants={itemVariants}
          >
            Explore cutting-edge technology, innovative design, and inspiring
            lifestyle content. Join our community of
            <span className="text-blue-600 dark:text-cyan-400 font-semibold">
              {" "}
              50,000+
            </span>{" "}
            creators and thought leaders.
          </motion.p>
          <motion.div className="space-x-4" variants={itemVariants}>
            <Link
              to={"/all-blogs"}
              className="btn btn-md md:btn-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
            >
              Explore Blogs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <button
              onClick={() => {
                const section = document.getElementById("newslatter");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-outline btn-md md:btn-lg text-white hover:bg-white/10 border-white/50"
            >
              Join Newsletter
              <Zap className="ml-2 w-5 h-5" />
            </button>
          </motion.div>
          <motion.div
            className="mt-12 flex items-center justify-center space-x-6"
            variants={itemVariants}
          >
            {[
              { label: "AI", value: "23,456" },
              { label: "Web Dev", value: "18,910" },
              { label: "Design", value: "12,500" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2 text-gray-300 group"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <TrendingUp className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                <div>
                  <div className="text-lg font-semibold text-white">
                    {item.value}
                  </div>
                  <div className="text-sm">{item.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
