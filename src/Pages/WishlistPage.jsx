import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Providers/AuthProviders";

const WishlistPage = () => {
  const [wishlistBlogs, setWishlistBlogs] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/wishlist/${user.email}`)
        .then((res) => {
          setWishlistBlogs(res.data);
        });
    }
  }, [user?.email]);

  const handleRemoveWishlist = async (blogId) => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/wishlist`, {
        blogId,
        userEmail: user.email,
      });
      if (res.data.wished === false) {
        Swal.fire("Removed!", "Blog removed from wishlist.", "success");
        setWishlistBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
      }
    } catch (error) {
      console.error("Error removing wishlist:", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "photo",
        header: "Photo",
        cell: ({ getValue }) => (
          <img
            src={getValue()}
            alt="Blog"
            className="w-24 h-12 md:w-48 md:h-24 object-cover rounded-md border border-white/20"
          />
        ),
      },
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <span className="text-cyan-300 text-xs md:text-lg font-semibold">
            {row.original.title}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-white text-xs md:text-lg font-semibold">
            {row.original.category}
          </span>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex flex-col gap-2">
            <button
              className="bg-cyan-600 hover:bg-cyan-700 px-2 py-1 rounded text-white text-sm"
              onClick={() => navigate(`/blog-details/${row.original._id}`)}
            >
              Details
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-white text-sm"
              onClick={() => handleRemoveWishlist(row.original._id)}
            >
              Remove
            </button>
          </div>
        ),
      },
    ],
    [navigate]
  );

  const table = useReactTable({
    data: wishlistBlogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
      <div className="w-11/12 mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Wishlisted Blogs</h2>
        {wishlistBlogs.length === 0 ? (
          <p className="text-white text-center">No blogs in your wishlist.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-cyan-300">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-white/20">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="p-3 text-left text-[14px] sm:text-lg"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistPage;
