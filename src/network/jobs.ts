import http from "./axiosInstance";

export const getAllJobAlerts = async () => {
  const res = await http.get("/job-alert");

  return res.data;
};
