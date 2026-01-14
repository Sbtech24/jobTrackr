import api from "./axios";
import { setAccessToken } from "@/lib/auth/token";

export type LoginPayload = {
  username: string;
  password: string;
};

export async function loginUser(data: LoginPayload) {
  const res = await api.post("/auth/login", data);
  return res.data;
}


export async function refreshAccessToken() {
  const res = await api.post("/auth/refresh");
  setAccessToken(res.data.accessToken);
}