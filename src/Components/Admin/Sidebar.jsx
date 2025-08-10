import { FilePlus, House, List, MessageCircleMore } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const Sidebar = () => {
  return (
    <div className="flex flex-col border-r border-gray-300 min-h-full pt-6 text-slate-800">
      <NavLink
        end={true}
        to="/admin"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-blue-200/50 border-r-4 border-blue-900"
          }`
        }
      >
        <House className="min-w-4 w-5 " />
        <p className="hidden md:inline-block">Dashboard</p>
      </NavLink>

      <NavLink
        to="/admin/add-blog"
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${
            isActive && "bg-blue-200/50 border-r-4 border-blue-900"
          }`
        }
      >
        <FilePlus className="min-w-4 w-5" />
        <p className="hidden md:inline-block">Add Blog</p>
      </NavLink>
    </div>
  );
};

export default Sidebar;
