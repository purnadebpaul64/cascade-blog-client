import React, { use } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddBlogPage = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();
  const { ref: titleRef, inView: titleInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: gridRef, inView: gridInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

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

  const handleAddBlog = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const newBlog = Object.fromEntries(formData.entries());
    newBlog.email = user?.email;

    axios
      .post(`${import.meta.env.VITE_API_URL}/add-blog`, newBlog)
      .then((data) => {
        console.log(data);
        Swal.fire({
          title: "Good job!",
          text: "Data Added Successfully",
          icon: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
            <p>Cascade Blogs</p>
          </motion.div>
          <motion.h2 className="text-4xl sm:text-5xl font-bold text-white mb-8">
            Add a New Blog Post
          </motion.h2>
          <motion.p
            className="text-md0 sm:text-xl text-white/80 max-w-3xl mx-auto backdrop-blur-sm bg-white/5 p-4 rounded-xl border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Share your knowledge, insights, and unique perspective with a global
            audience. Inspire, inform, and make an impact with every blog post
            you create.
          </motion.p>
        </motion.div>
      </div>

      {/* ====== form ====== */}
      <div className="w-full sm:w-10/12 mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={gridRef}
          className="text-center mb-12 border-1 rounded-2xl border-blue-400 p-3 sm:p-8 backdrop-blur-2xl bg-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <form onSubmit={handleAddBlog}>
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              <div className="col-span-2">
                {/* Blog Title */}
                <fieldset className="fieldset">
                  <label className="label text-sm font-semibold text-white">
                    Title
                  </label>
                  <input
                    type="text"
                    className="input w-full border-1 border-blue-300"
                    placeholder="Blog Title"
                    name="title"
                    required
                  />
                </fieldset>
              </div>
              {/* blog image */}
              <fieldset className="fieldset">
                <label className="label text-sm font-semibold text-white">
                  Featured Image
                </label>
                <input
                  type="text"
                  className="input border-1 border-blue-300 w-full "
                  placeholder="Photo URL"
                  name="photo"
                  required
                />
              </fieldset>
              {/* category */}
              <fieldset className="fieldset">
                <label className="label text-sm font-semibold text-white">
                  Blog Category
                </label>

                <select
                  name="category"
                  className="select select-bordered border-blue-300 w-full"
                  required
                >
                  <option disabled selected>
                    Select a category
                  </option>
                  <option>Technology</option>
                  <option>Business</option>
                  <option>Lifestyle</option>
                  <option>Design</option>
                  <option>Travel</option>
                  <option>Food & Health</option>
                </select>
              </fieldset>
              <div className="col-span-2">
                {/* short details */}
                <fieldset className="fieldset">
                  <label className="label text-sm font-semibold text-white">
                    Short Details
                  </label>
                  <textarea
                    rows="1"
                    className="textarea textarea-bordered w-full border-blue-300"
                    placeholder="Enter the short details"
                    name="short details"
                    required
                  />
                </fieldset>
              </div>
              <div className="col-span-2">
                {/* blog details */}
                <fieldset className="fieldset">
                  <label className="label font-semibold text-white">
                    Blog Details
                  </label>
                  <textarea
                    rows="6"
                    className="textarea textarea-bordered border-blue-300 w-full"
                    placeholder="Enter the details"
                    name="blog details"
                    required
                  />
                </fieldset>
              </div>
            </div>

            <button className="h-10 px-6 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm btn w-full mt-5 text-white font-bold">
              Add Your Blog
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default AddBlogPage;
