import axios from 'axios';

const api = axios.create({
  baseURL: 'https://task4-backend-1.onrender.com', // Update this to the correct back-end URL
});

// Attach token to each request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Corrected spelling here
  }
  return config;
});

// Handle 403 responses and redirect to login page if needed
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 403) {
      // Redirect to the login page if the user is blocked or unauthorized
      localStorage.removeItem('token'); // Remove the token
      window.location.href = '/login'; // Redirect to the login page
    }
    return Promise.reject(error);
  }
);

export default api;

