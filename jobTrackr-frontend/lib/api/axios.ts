import axios from "axios";
import { getAccessToken } from "@/lib/auth/token";

const api = axios.create({
  baseURL: "/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});




export default api;
