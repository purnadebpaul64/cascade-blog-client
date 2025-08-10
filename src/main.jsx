import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import router from "./Routers/Route.jsx";
import AuthProviders from "./Providers/AuthProviders.jsx";
import { HelmetProvider } from "react-helmet-async";
import "quill/dist/quill.snow.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AuthProviders>
        <RouterProvider router={router}></RouterProvider>
      </AuthProviders>
    </HelmetProvider>
  </StrictMode>
);
