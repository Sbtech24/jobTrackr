
import api from "./axios";

export async function fetchOverviewData() {
  const res = await api.get("/api/overview");
  return res.data;
}


