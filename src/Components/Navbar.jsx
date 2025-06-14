import {
  BookmarkCheck,
  CirclePlus,
  FileText,
  Gem,
  House,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import React, { use, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Providers/AuthProviders";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Loged Out Successfully",
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
    <section className=" w-full border-b border-[#1F2531] bg-[#05080B]/85 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={"/"}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CascadeBlog
              </h1>
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="menu menu-horizontal gap-5 px-1 font-bold">
              <NavLink
                to={"/"}
                className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
              >
                <House className="h-4 w-4" />
                <span>Home</span>
              </NavLink>
              <NavLink
                to={"/all-blogs"}
                className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
              >
                <FileText className="h-4 w-4" />
                <span>All blogs</span>
              </NavLink>
              <NavLink
                to={"/featured-blogs"}
                className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
              >
                <Gem className="h-4 w-4" />
                <span>Featured Blogs</span>
              </NavLink>
              {user && (
                <>
                  <NavLink
                    to={"/add-blog"}
                    className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <CirclePlus className="h-4 w-4" />
                    <span>Add Blog</span>
                  </NavLink>
                  <NavLink
                    to={"/wishlist"}
                    className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                  >
                    <BookmarkCheck className="h-4 w-4" />
                    <span>Wishlist</span>
                  </NavLink>
                </>
              )}
            </ul>
          </div>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center tooltip tooltip-bottom"
                  data-tip={user.displayName}
                >
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to={"/auth"} className="btn btn-outline btn-sm">
                  <LogIn className="h-4 w-4 mr-1" />
                  <p>Login</p>
                </Link>

                <Link
                  to={"/auth/registration"}
                  className="btn btn-sm bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className=" pt-2 pb-3 space-y-1 bg-background border-t border-[#1F2531]">
              <ul>
                <NavLink
                  to={"/"}
                  className="flex items-center space-x-2 text-[#757D85] hover:text-primary transition-colors px-3 py-2 rounded-md hover:bg-accent"
                >
                  <House className="h-4 w-4" />
                  <span>Home</span>
                </NavLink>
                <NavLink
                  to={"/all-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                >
                  <FileText className="h-4 w-4" />
                  <span>All blogs</span>
                </NavLink>
                <NavLink
                  to={"/featured-blogs"}
                  className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                >
                  <Gem className="h-4 w-4" />
                  <span>Featured Blogs</span>
                </NavLink>
                {user && (
                  <>
                    <NavLink
                      to={"/add-blog"}
                      className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                    >
                      <CirclePlus className="h-4 w-4" />
                      <span>Add Blog</span>
                    </NavLink>
                    <NavLink
                      to={"/wishlist"}
                      className="flex items-center space-x-1 text-[#757D85] hover:text-primary transition-colors font-medium px-3 py-2 rounded-md hover:bg-accent"
                    >
                      <BookmarkCheck className="h-4 w-4" />
                      <span>Wishlist</span>
                    </NavLink>
                  </>
                )}
              </ul>
              <div className="pt-4 space-y-2 border-t border-[#1F2531]">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <img src={user.photoURL} alt={user.displayName} />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Profile
                      </span>
                    </div>
                    <button
                      className="w-full btn btn-outline"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <button className="w-full btn btn-outline">
                      <LogIn className="h-4 w-4 mr-1" />
                      Login
                    </button>
                    <button className="btn btn-md bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 w-full">
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Navbar;
