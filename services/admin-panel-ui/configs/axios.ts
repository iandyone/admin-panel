import axios from 'axios'

import { auth } from './auth';

export const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const $axios_server = axios.create({
  baseURL: process.env.API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})


$axios_server.interceptors.request.use(async (config) => {
  const session = await auth();
  const token = session?.accessToken;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});
