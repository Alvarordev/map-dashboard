import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const authInterceptor = (req: any) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken}`;
  }
  return req;
};

export const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(authInterceptor);

export const handleApiError = async (error: any) => {
  try {
    const errorMessage =
      error.response?.data?.message || "An unexpected error occurred.";
    const data = null;
    return { error: errorMessage, data };
  } catch (err) {
    throw new Error("An unexpected error occurred.");
  }
};
