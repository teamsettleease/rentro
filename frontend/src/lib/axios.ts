import axios, { AxiosInstance } from 'axios';

// Determine baseURL with priority:
// 1. NEXT_PUBLIC_API_URL from env (for frontend in Next.js)
// 2. fallback to localhost for local development
const getBaseURL = (): string => {
  const envURL = process.env.NEXT_PUBLIC_API_URL;
  if (envURL && envURL.trim() !== '') {
    return envURL;
  } 
  
  // Fallback to localhost
  return 'http://localhost:5000/api/v1';
};

const baseURL = getBaseURL();

// Only log in development
if (process.env.NODE_ENV === 'development') {
  console.log(`[axios] Using baseURL: ${baseURL}`);
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for basic error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle different error scenarios
    if (error.response) {
      const { status, data } = error.response;
      console.error(`[axios] HTTP ${status} error:`, data?.message || error.message);
    } else if (error.request) {
      // Network error
      console.error('[axios] Network error - no response received:', error.message);
    } else {
      // Request setup error
      console.error('[axios] Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;