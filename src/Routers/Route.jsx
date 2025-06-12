import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import HomePage from "../Pages/HomePage";
import AddBlogPage from "../Pages/AddBlogPage";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Components/AuthComponents/Login";
import Registration from "../Components/AuthComponents/Registration";

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
]);

export default router;
