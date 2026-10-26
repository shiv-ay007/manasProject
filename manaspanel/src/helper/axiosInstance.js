import axios from "axios";

// When running on localhost, use local backend on port 5004 for fast and direct response
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

const BASE_URL = isLocalhost
  ? "http://localhost:5004/api/v1"
  : "https://db.drmanasaggarwal.com/api/v1";

const axiosInstance1 = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 15000,
});

export default axiosInstance1;
