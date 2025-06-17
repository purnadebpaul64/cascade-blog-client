import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Zap, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";
const NewsLatterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.2,
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
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      Swal.fire({
        title: "Thank you for subscribing!",
        text: "You've been successfully subscribed to our newsletter. Welcome to the CascadeBlog community!",
        icon: "success",
        draggable: true,
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };
  return (
    <section
      id="newslatter"
      className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl"
          animate={floatingVariants.animate}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-56 h-56 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          animate={{
            ...floatingVariants.animate,
            transition: { ...floatingVariants.animate.transition, delay: 2 },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-2xl"
          animate={{
            ...floatingVariants.animate,
            transition: { ...floatingVariants.animate.transition, delay: 1 },
          }}
        />
      </div>
      {/* /////// */}
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={sectionRef}
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          <motion.div className="mb-8" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg border-2 border-white backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 12 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-white mb-8"
              transition={{ duration: 0.3 }}
            >
              <p>Stay in the Loop</p>
            </motion.h2>
            <motion.p
              className="text-xl text-white/80 max-w-2xl mx-auto backdrop-blur-sm bg-white/5 p-6 rounded-xl border border-white/10"
              variants={itemVariants}
            >
              Get the latest articles, insights, and updates delivered straight
              to your inbox. Join over{" "}
              <span className="text-cyan-400 font-semibold">50,000</span>{" "}
              subscribers who trust us for quality content.
            </motion.p>
          </motion.div>

          {/* Glassmorphism form */}
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto mb-8 backdrop-blur-lg bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex space-x-2">
              <motion.div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full p-3 border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 focus:border-cyan-500 transition-all duration-300 hover:border-white/50 focus:shadow-lg rounded-xl"
                  required
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm rounded-xl"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                      Subscribing...
                    </span>
                  ) : (
                    <div className="flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Subscribe
                    </div>
                  )}
                </button>
              </motion.div>
            </div>
          </motion.form>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-6 text-sm"
            variants={itemVariants}
          >
            {[
              { icon: CheckCircle, text: "Weekly newsletter" },
              { icon: CheckCircle, text: "No spam, ever" },
              { icon: CheckCircle, text: "Unsubscribe anytime" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center hover:text-green-400 transition-colors duration-300 group backdrop-blur-sm bg-white/5 px-3 py-2 rounded-lg border border-white/10"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <item.icon className="w-4 h-4 text-green-400 mr-2" />
                </motion.div>
                <span className="text-white/80">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLatterSection;
