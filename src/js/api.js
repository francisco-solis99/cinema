import axios from 'axios';
import { getItemFromLocalStorage } from './utils';

// Config API
const { language } = getItemFromLocalStorage('cinema-lang');
export const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    api_key: import.meta.env.VITE_TMDB_KEY,
    language: language ?? 'en-US'
  }
});
