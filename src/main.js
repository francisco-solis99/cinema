import './styles/styles.scss';
import { Router } from './router/router.js';

const router = new Router();

window.addEventListener('DOMContentLoaded', () => router.init(), false);
window.addEventListener('hashchange', () => {
  // console.log(window.location.hash);
  router.loadRoute();
}, false);
