import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("SCRAPPER_REFRESH_TOKEN");
      if (refreshToken) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { token: newToken, refreshToken: newRefreshToken } =
            response.data.data;

          localStorage.setItem("SCRAPPER_TOKEN", newToken);
          localStorage.setItem("SCRAPPER_REFRESH_TOKEN", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return http(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("SCRAPPER_TOKEN");
          localStorage.removeItem("SCRAPPER_REFRESH_TOKEN");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  },
);

export default http;
