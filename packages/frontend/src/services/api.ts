import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError } from '../types';

// Get the API base URL from environment variables or default to localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
const IS_CODESPACE = import.meta.env.CODESPACES === 'true';

console.log('Frontend API service initializing with:', {
  API_URL,
  IS_CODESPACE
});

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Debug-Source': 'frontend-api-service',
    'X-Codespace-Request': IS_CODESPACE ? 'true' : 'false'
  },
  // Important: DON'T use withCredentials with wildcard CORS - browsers won't allow it
  withCredentials: false
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