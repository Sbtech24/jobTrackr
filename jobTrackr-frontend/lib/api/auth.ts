import api from "./axios";
import { setAccessToken } from "@/lib/auth/token";

export type LoginPayload = {
  username: string;
  password: string;
};
export type RegisterPayload = {
  username: string;
  password: string;
};
export type ForgotPasswordPayload = {
  newPassword: string;
  confirmPassword: string;
};

export async function loginUser(data: LoginPayload) {
  const res = await api.post("/auth/login", data);
  return res.data;
}
export async function RegisterUser(data:RegisterPayload) {
  const res = await api.post("/auth/register", data);
  return res.data;
}

export async function logOut() {
  const res = await api.post("/auth/logout");
  return res.data;
}

export async function refreshAccessToken() {
  const res = await api.post("/auth/refresh");
  setAccessToken(res.data.accessToken);
}

export async function forgotPassword(data:ForgotPasswordPayload) {
  const res = await api.post("/auth/forgot-password",data);
  return res.data
}