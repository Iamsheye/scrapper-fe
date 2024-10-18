import http from "./axiosInstance";

type ISignInRes = {
  id: string;
  email: string;
  name: string;
  isPremium: false;
  token: string;
  refreshToken: string;
};

export const googleLogin = async (code: string) => {
  const res = await http.post("/auth/google", { code });

  return res.data;
};

export const signIn = async (payload: { email: string; password: string }) => {
  const res = await http.post("/auth/signin", payload);

  return res.data.data as ISignInRes;
};

export const signUp = async (payload: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await http.post("/auth/signup", payload);

  return res.data;
};
