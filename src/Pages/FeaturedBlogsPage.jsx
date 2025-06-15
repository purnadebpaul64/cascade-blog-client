import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronsUpDown, ChevronUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

const FeaturedBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [sorting, setSorting] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/featured-blogs`).then((res) => {
      setBlogs(res.data);
    });
  }, []);

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
          <span className="text-cyan-300 text-xs md:text-lg font-semibold cursor-pointer hover:underline">
            {row.original.title}
          </span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <span className="text-white text-xs md:text-lg font-semibold cursor-pointer hover:underline">
            {row.original.category}
          </span>
        ),
      },
      // {
      //   accessorKey: "shortDetails",
      //   header: "Short Details",
      // },
      {
        accessorKey: "wordCount",
        header: "Word Count",
      },
    ],
    []
  );

  const table = useReactTable({
    data: blogs,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <>
      <Helmet>
        <title>Featured Blogs | CascadeBlog</title>
      </Helmet>
      <section className=" py-20 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 relative overflow-hidden">
        <div className=" w-11/12 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Top 10 Featured Blogs</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-cyan-300">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="bg-white/20">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        className="p-3 text-left cursor-pointer text-[14px] sm:text-lg"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "desc" ? (
                          <ChevronUp className="w-4 h-4 inline" />
                        ) : header.column.getIsSorted() === "asc" ? (
                          <ChevronDown className="w-4 h-4 inline" />
                        ) : (
                          <ChevronsUpDown className="w-4 h-4 inline" />
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
                    className="border-t bg-white/5 backdrop-blur-xl cursor-pointer hover:bg-white/10"
                    onClick={() =>
                      navigate(`/blog-details/${row.original._id}`)
                    }
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
        </div>
      </section>
    </>
  );
};

export default FeaturedBlogsPage;
