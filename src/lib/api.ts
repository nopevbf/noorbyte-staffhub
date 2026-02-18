import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors if needed (e.g. for logging, error handling)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling logic can go here
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
