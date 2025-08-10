import axios from "axios";
import Swal from "sweetalert2";
import { ClockPlus, List, MessageCircleMore } from "lucide-react";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalBlogs: 0, totalComments: 0 });
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = user?.accessToken;

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/stats`)
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`${import.meta.env.VITE_API_URL}/blogs-by-user/${user.email}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBlogData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user?.email, token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/delete-blog/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBlogData((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
        Swal.fire("Deleted!", "Your blog has been deleted.", "success");
      } catch (error) {
        console.error("Failed to delete blog:", error);
        Swal.fire("Error", "Failed to delete blog.", "error");
      }
    }
  };

  if (loading) return <p className="text-slate-800">Loading stats...</p>;

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50">
      {/* Stats Section */}
      <div className="flex flex-wrap gap-4 font-medium">
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div className="p-3 rounded bg-blue-100 text-slate-900">
            <List />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {stats.totalBlogs}
            </p>
            <p className="text-gray-400 font-medium">Blogs</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all">
          <div className="p-3 rounded bg-blue-100 text-slate-900">
            <MessageCircleMore />
          </div>
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {stats.totalComments}
            </p>
            <p className="text-gray-400 font-medium">Comments</p>
          </div>
        </div>
      </div>

      {/* Latest Blogs */}
      <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
        <ClockPlus />
        <p>Latest Blogs</p>
      </div>

      <div className="relative max-w-2x1 md:w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-xs text-gray-600 text-left uppercase">
            <tr>
              <th scope="col" className="px-2 py-4 xl:px-6">
                #
              </th>
              <th scope="col" className="px-2 py-4">
                Blog Title
              </th>
              <th scope="col" className="px-2 py-4 max-sm:hidden">
                Date
              </th>
              <th scope="col" className="px-2 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogData.map((blog, index) => (
              <tr
                key={blog._id}
                className="border-y border-gray-300 font-medium"
              >
                <th className="px-2 py-4">{index + 1}</th>
                <td className="px-2 py-4">{blog.title}</td>
                <td className="px-2 py-4 max-sm:hidden">
                  {new Date(blog.createdAt).toDateString()}
                </td>
                <td className="px-2 py-4 flex text-xs gap-3">
                  <button
                    onClick={() => navigate(`/admin/update-blog/${blog._id}`)}
                    className="border px-2 py-0.5 mt-1 rounded cursor-pointer bg-blue-200"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="border px-2 py-0.5 mt-1 rounded cursor-pointer bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
