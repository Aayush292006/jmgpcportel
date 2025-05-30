import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jmgpc-backend.onrender.com/api',
});

