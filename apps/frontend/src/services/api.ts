import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // TODO get this value from configuration

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
