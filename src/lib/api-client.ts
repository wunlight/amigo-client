import axios from "axios";

const BASE_URL = "http://localhost:4139/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10_000,
});

apiClient.interceptors.response.use(
  (res) => res,
  (e) => {
    console.error("API error: ", e);
    return Promise.reject(e);
  },
);
