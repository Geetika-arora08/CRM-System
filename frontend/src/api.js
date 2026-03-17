import axios from "axios";

const baseURL =
  window.location.hostname === "localhost"
    ? "http://localhost:1995/api"
    : "https://crm-system-mh0v.onrender.com/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Token auto attach
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔥 Auto logout
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/admin";
    }
    return Promise.reject(err);
  }
);

export default api;
