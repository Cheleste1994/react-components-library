import axios, { CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
};

const AxiosClassic = axios.create(options);
const AxiosWithAuth = axios.create(options);

AxiosWithAuth.interceptors.request.use(async (config) => {
  const token = undefined;

  if (token && config?.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { AxiosClassic, AxiosWithAuth };
