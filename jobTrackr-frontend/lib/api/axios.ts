import axios from "axios";
import { getAccessToken } from "@/lib/auth/token";

const api = axios.create({
  baseURL: "http://jobtrackr-production.up.railway.app/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export default api;
