import React, { use } from "react";
import { Navigate, useLocation } from "react-router";
import Loading from "../Components/Loading";
import { AuthContext } from "./AuthProviders";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/auth"}></Navigate>;
};

export default PrivateRoute;
