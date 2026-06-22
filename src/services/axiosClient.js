import axios from "axios";

const baseURL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://6a39283d64a2d826922382f5.mockapi.io";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (optional: for auth headers)
axiosClient.interceptors.request.use(
  (config) => {
    // e.g. attach token here if available
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor for centralized error handling
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can add logging or format errors here
    return Promise.reject(error);
  },
);

export default axiosClient;
