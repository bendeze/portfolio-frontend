import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 2. CHANGE THIS: .request -> .response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Now this will actually print your Django error details
    // console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  } 
);