import api from "./axios";

export interface addJobPayLoad{
    title:string,
    company:string,
    status:string,
    description:string,
    date_applied?:string

}

export async function addJob(data: addJobPayLoad) {
  const res = await api.post("/api/jobs", data);
  return res.data;
}
export async function fetchAllJobs() {
  const res = await api.get("/api/jobs");
  return res.data;
}
export async function deleteJob(id:string) {
  const res = await api.delete(`/api/jobs/${id}`);
  return res.data;
}
export async function fetchJobById(id: string) {
  const res = await api.get(`/api/jobs/${id}`);
  return res.data.data[0];
}
export async function UpdateJobById(id: string,payload:any) {
  const res = await api.patch(`/api/jobs/${id}`,payload);
  return res.data.data[0];
}


