import axios from 'axios';

// Config API
export const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    api_key: import.meta.env.VITE_TMDB_KEY
  }
});
