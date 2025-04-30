import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, // Only set true if you use cookies/auth headers
});

export default api;
