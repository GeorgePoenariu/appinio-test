import axios from 'axios';

export const api = axios.create({
  baseURL:
    process.env.REACT_APP_NODE_ENV === 'development'
      ? process.env.REACT_APP_DEV_BACKEND_URL
      : process.env.REACT_APP_LOCAL_BACKEND_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
