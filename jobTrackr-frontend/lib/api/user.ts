
import api from "./axios";

export async function UserProfile() {
  const res = await api.get("/api/user");
  return res.data;
}


