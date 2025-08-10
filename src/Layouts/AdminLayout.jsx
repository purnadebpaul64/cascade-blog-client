import React, { useContext } from "react";
import { Link, Outlet } from "react-router";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";
import Sidebar from "../Components/Admin/Sidebar";

const AdminLayout = () => {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out Successfully",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <div className="">
      <div className="flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-300 bg-white">
        <Link to={"/"}>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CascadeBlog
          </h1>
        </Link>
        <button
          className="btn btn-outline btn-sm bg-accent"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-1" />
          Logout
        </button>
      </div>
      <div className="flex h-[calc(100vh-70px)] bg-white">
        <div>
          <Sidebar></Sidebar>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminLayout;
