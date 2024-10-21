import { type JobAlert } from "@/types";
import http from "./axiosInstance";

type ICreateJobAlert = {
  name: string;
  search: string;
  description?: string;
  includeWords?: string[];
  omitWords?: string[];
};

export const getAllJobAlerts = async () => {
  const res = await http.get("/job-alert");

  return res.data.data as JobAlert[];
};

export const createJobAlert = async (data: ICreateJobAlert) => {
  const res = await http.post("/job-alert", data);

  return res.data.data as any;
};
