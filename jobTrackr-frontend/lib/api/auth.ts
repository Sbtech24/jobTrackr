
import api from "./axios";
import { setAccessToken } from "@/lib/auth/token";


export type LoginPayload = {
  email: string;
  password: string;
};
export type RegisterPayload = {
  email: string;
  password: string;
  username:string
};
export type ForgotPasswordPayload = {
  newPassword: string;
  confirmPassword: string;
};

export async function loginUser(payload: { email: string; password: string }) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}


export async function RegisterUser(data:RegisterPayload) {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const response = await res.json()

  return response;
}

export async function logOut() {
  const res = await api.post("/api/auth/logout");
  return res.data;
}

export async function refreshAccessToken() {
  const res = await fetch("/api/auth/refresh",{
    method:"POST",
    headers:{"content-type":"application/json"}
  });
  const response = await res.json()
 return response
}

export async function forgotPassword(data:ForgotPasswordPayload) {
  const res = await api.post("/auth/forgot-password",data);
  return res.data
}