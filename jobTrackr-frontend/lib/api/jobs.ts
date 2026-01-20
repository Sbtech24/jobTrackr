import api from "./axios";

export interface addJobPayLoad{
    title:string,
    company:string,
    status:string,
    description:string,
    date_applied?:string

}

export async function addJob(data: addJobPayLoad) {
  const res = await api.post("/jobs", data);
  return res.data;
}
export async function fetchAllJobs() {
  const res = await api.get("/jobs");
  return res.data;
}


