import './styles/styles.scss';
import { Router } from './router/router.js';

const router = new Router();

window.addEventListener('DOMContentLoaded', () => {
  router.init();
  window.history.pushState({ backUrl: window.location.href }, null, '');
}, false);
window.addEventListener('hashchange', () => {
  router.loadRoute();
}, false);
