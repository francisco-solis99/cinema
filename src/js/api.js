import APIKEY from './key.js';
import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    api_key: APIKEY
  }
});
