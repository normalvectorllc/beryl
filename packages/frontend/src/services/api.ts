import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from '../types';

// Get the API base URL from environment variables or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: error.message || 'An unknown error occurred',
      status: error.response?.status || 500,
    };

    if (error.response?.data) {
      const data = error.response.data as any;
      if (data.error) {
        apiError.message = data.error.message || apiError.message;
      }
      if (data.errors) {
        apiError.errors = data.errors;
      }
    }

    return Promise.reject(apiError);
  }
);

export { api };