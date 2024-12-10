import './styles/styles.scss';
import { Router } from './router/router.js';

const router = new Router();

// Init the router object to load the routes of the app
window.addEventListener('DOMContentLoaded', () => {
  router.init();
  window.history.pushState({ backUrl: window.location.href }, null, '');
}, false);

// When the has change, load the corresponding path and render the view for that path
window.addEventListener('hashchange', () => {
  router.loadRoute();
}, false);
