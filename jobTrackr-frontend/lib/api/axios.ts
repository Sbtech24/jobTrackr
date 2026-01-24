import axios from "axios";
import { getAccessToken } from "@/lib/auth/token";

const api = axios.create({
  baseURL: "https://jobtrackr-production.up.railway.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  const isAuthRoute =
    config.url?.includes("/auth/login") ||
    config.url?.includes("/auth/refresh");

  if (token && !isAuthRoute) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});




export default api;
