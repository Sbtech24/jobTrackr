import api from "./axios";

export async function UserProfile() {
  const res = await api.get("/user/me");
  return res.data;
}


