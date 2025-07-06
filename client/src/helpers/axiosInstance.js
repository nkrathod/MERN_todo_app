import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4000/", // ✅ replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional: if using cookies
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or from cookies/session
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
