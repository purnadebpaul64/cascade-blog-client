import React, { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { section } from "motion/react-client";

const FeaturedBlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/featured-blogs`).then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "shortDetails",
        header: "Short Details",
      },
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
                      className="p-3 text-left cursor-pointer"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                      {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t bg-white/5 backdrop-blur-xl"
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
  );
};

export default FeaturedBlogsPage;
