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
        element: <AddBlogPage></AddBlogPage>,
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
        element: <UpdateBlogPage></UpdateBlogPage>,
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
