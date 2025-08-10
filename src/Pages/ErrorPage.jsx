import React from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Link } from "react-router";

const ErrorPage = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // only trigger once
    threshold: 0.2, // 20% visible
  });
  return (
    <div className="min-h-screen flex flex-col text-center gap-8 items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 px-4">
      <motion.div
        ref={ref}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-9xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          404
        </h1>
        {/* Enhanced Error Message */}
        <div className="mb-12 space-y-6 animate-fade-in delay-200">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Oops! Page not found
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              The page you're looking for seems to have wandered off into the
              digital void.
            </p>
            <p className="text-muted-foreground">
              But don't worry! We've got plenty of amazing content waiting for
              you.
            </p>
          </div>
        </div>
        {/* button */}
        <Link
          to={"/"}
          className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm rounded-xl"
        >
          Go Back To Home
        </Link>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
