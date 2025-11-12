import axios, { AxiosHeaders } from 'axios';

// const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'http://localhost:8080/api/';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    const headers = new AxiosHeaders(config.headers as any);
    headers.set('Authorization', `Bearer ${token}`);
    config.headers = headers;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});
