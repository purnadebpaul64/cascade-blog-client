import { Calendar, User } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../Providers/AuthProviders";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const BlogDetailPage = () => {
  const { user } = use(AuthContext);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const blogData = useLoaderData();
  const {
    _id,
    title,
    photo,
    category,
    addedEmail,
    createdAt,
    blogDetails,
    addedUser,
    shortDetails,
  } = blogData;

  const isOwner = user?.email === addedEmail;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/comments/${_id}`)
      .then((res) => setComments(res.data))
      .catch((err) => console.error("Error fetching comments:", err));
  }, [_id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to post a comment.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (isOwner) {
      Swal.fire({
        icon: "info",
        title: "Not Allowed",
        text: "You cannot comment on your own blog.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    if (!commentText.trim()) return;

    const newComment = {
      blogId: _id,
      userName: user.displayName,
      userPhoto: user.photoURL,
      commentText,
      userEmail: user.email,
    };

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/comments`, newComment);
      setCommentText("");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${_id}`
      );
      setComments(res.data);
      Swal.fire({
        icon: "success",
        title: "Comment Posted!",
        text: "Your comment has been added successfully.",
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong!",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <section className="py-20 bg-gradient-to-br from-purple-950 via-gray-900 to-purple-950">
        <div className="w-11/12 md:w-8/12 mx-auto space-y-10">
          <div className="badge px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-md font-semibold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
            {category}
          </div>
          <div>
            <h1 className="font-bold text-5xl leading-15">{title}</h1>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-400">
              {shortDetails}
            </h2>
          </div>
          <div className="flex items-center space-x-6 text-slate-400 mb-8">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>{addedUser}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(createdAt)}</span>
            </div>
          </div>
          <div>
            <img
              className="object-cover rounded-2xl shadow-lg h-96 w-full"
              src={photo}
              alt=""
            />
          </div>
          <div>
            <p className="text-lg leading-10 text-gray-300">{blogDetails}</p>
          </div>
          <div>
            {isOwner && (
              <Link
                to={`/update-blog/${_id}`}
                className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
              >
                Update Blog
              </Link>
            )}
          </div>

          <h3 className="text-2xl text-white font-semibold mb-4">Comments</h3>

          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full p-4 rounded-lg backdrop-blur-2xl bg-white/10 border-1 border-cyan-400 text-white"
              placeholder="Write your comment here..."
              rows="4"
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
            >
              Post Comment
            </button>
          </form>

          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-gray-800 rounded-lg p-4 text-white flex gap-4"
                >
                  <img
                    src={comment.userPhoto}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{comment.userName}</p>
                    <p className="text-sm text-gray-300">
                      {comment.commentText}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No comments yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;
