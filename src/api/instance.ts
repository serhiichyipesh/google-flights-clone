import axios from 'axios';

export const ApiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'x-rapidapi-key': import.meta.env.VITE_API_KEY,
    'x-rapidapi-host': import.meta.env.VITE_API_HOST,
  },
});
