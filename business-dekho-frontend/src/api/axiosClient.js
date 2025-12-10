// src/api/axiosClient.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080", // Spring Boot base URL
});

// OPTIONAL: log errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error?.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
