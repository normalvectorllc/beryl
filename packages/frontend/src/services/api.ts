import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from '../types';

// Using a relative URL - Vite proxy will handle forwarding to the backend
// No need for environment variables or absolute URLs - much simpler!
const API_URL = '/api';

console.log('Frontend API service initializing with relative URL:', API_URL);

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API response from ${response.config.url}:`, response.status);
    return response;
  },
  (error: AxiosError) => {
    console.error('API response error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });

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