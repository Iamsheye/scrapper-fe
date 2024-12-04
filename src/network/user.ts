import { User } from "@/types";
import http from "./axiosInstance";

export const getUserDetails = async () => {
  const res = await http.get("/user/me");

  return res.data.data as User;
};

export const sendMailVerification = async () => {
  await http.post("/user/send-verification-email");

  return;
};

export const changePassword = async (data: {
  newPassword: string;
  oldPassword: string;
}) => {
  await http.patch("/user/password", data);

  return;
};
