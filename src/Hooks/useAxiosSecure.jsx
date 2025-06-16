import axios from "axios";
import React, { use } from "react";
import { AuthContext } from "../Providers/AuthProviders";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = use(AuthContext);
  const token = user.accessToken;

  instance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${token}`;
    return config;
  });
  return instance;
};

export default useAxiosSecure;
