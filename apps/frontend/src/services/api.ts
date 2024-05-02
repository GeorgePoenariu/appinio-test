import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV_BACKEND_URL
      : 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
