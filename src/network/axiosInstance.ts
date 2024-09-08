import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL as string;
const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem("SCRAPPER_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle the error
    return Promise.reject(error);
  }
);

export default http;
