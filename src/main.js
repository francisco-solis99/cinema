import './styles/styles.scss';
import { Router } from './router/router.js';

const router = new Router();

window.addEventListener('DOMContentLoaded', () => router.init(), false);
window.addEventListener('hashchange', () => {
  router.loadRoute();
}, false);
