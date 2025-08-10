import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/AuthComponents/Login";
import Registration from "../Components/AuthComponents/Registration";
import ErrorPage from "../Pages/ErrorPage";
import AllBlogsPage from "../Pages/AllBlogsPage";
import BlogDetailPage from "../Pages/BlogDetailPage";
import axios from "axios";
import FeaturedBlogsPage from "../Pages/FeaturedBlogsPage";
import WishlistPage from "../Pages/WishlistPage";
import PrivateRoute from "../Providers/PrivateRoute";
import AdminLayout from "../Layouts/AdminLayout";
import Dashboard from "../Pages/admin/Dashboard";
import AddBlog from "../Pages/admin/AddBlog";
import UpdateBlog from "../Pages/admin/UpdateBlog";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <HomePage></HomePage>,
      },
      {
        path: "all-blogs",
        element: <AllBlogsPage></AllBlogsPage>,
      },
      {
        path: "blog-details/:id",
        loader: async ({ params }) => {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/single-blog/${params.id}`
          );
          return res.data;
        },
        element: <BlogDetailPage></BlogDetailPage>,
      },
      {
        path: "featured-blogs",
        element: <FeaturedBlogsPage></FeaturedBlogsPage>,
      },
      {
        path: "wishlist",
        element: (
          <PrivateRoute>
            <WishlistPage></WishlistPage>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth",
        element: <Login></Login>,
      },
      {
        path: "/auth/registration",
        element: <Registration></Registration>,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        path: "/admin",
        element: (
          <PrivateRoute>
            {" "}
            <Dashboard></Dashboard>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/add-blog",
        element: (
          <PrivateRoute>
            <AddBlog></AddBlog>
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/update-blog/:id",
        loader: async ({ params }) => {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/single-blog/${params.id}`
          );
          return res.data;
        },
        element: (
          <PrivateRoute>
            <UpdateBlog></UpdateBlog>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
