import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import AddBlogPage from "../Pages/AddBlogPage";

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
        path: "/add-blog",
        element: <AddBlogPage></AddBlogPage>,
      },
    ],
  },
]);

export default router;
