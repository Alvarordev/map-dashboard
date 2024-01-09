import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL

export const API = axios.create({baseURL: BASE_URL})

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