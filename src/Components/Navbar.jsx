import { FileText, Gem, House, LogIn, Menu, X } from "lucide-react";
import React, { useState } from "react";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full border-b border-[#1F2531] bg-[#05080B]/85 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CascadeBlog
            </h1>
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
            </ul>
          </div>
          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
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
              </ul>
              <div className="pt-4 space-y-2 border-t border-[#1F2531]">
                <div className="space-y-2">
                  <button className="w-full btn btn-outline">
                    <LogIn className="h-4 w-4 mr-1" />
                    Login
                  </button>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
