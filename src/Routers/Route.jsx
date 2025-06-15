import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import AddBlogPage from "../Pages/AddBlogPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/AuthComponents/Login";
import Registration from "../Components/AuthComponents/Registration";
import ErrorPage from "../Pages/ErrorPage";
import AllBlogsPage from "../Pages/AllBlogsPage";
import BlogDetailPage from "../Pages/BlogDetailPage";
import axios from "axios";
import UpdateBlogPage from "../Pages/UpdateBlogPage";
import FeaturedBlogsPage from "../Pages/FeaturedBlogsPage";
import WishlistPage from "../Pages/WishlistPage";
import PrivateRoute from "../Providers/PrivateRoute";

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
        path: "add-blog",
        element: (
          <PrivateRoute>
            <AddBlogPage></AddBlogPage>
          </PrivateRoute>
        ),
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
        path: "update-blog/:id",
        loader: async ({ params }) => {
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/single-blog/${params.id}`
          );
          return res.data;
        },
        element: (
          <PrivateRoute>
            <UpdateBlogPage></UpdateBlogPage>
          </PrivateRoute>
        ),
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
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

export default router;
