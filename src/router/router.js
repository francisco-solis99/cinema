import { getURLHash, replaceHTML } from '../js/utils.js';
import { routes } from './routes.js';

export function Router() {
  this.routes = routes;
  this.isFirstLoad = true;
}

Router.prototype = {
  constructor: Router,
  init() {
    this.initialContent = document.body.innerHTML;
    this.loadRoute();
  },

  async loadRoute() {
    const routeName = getURLHash();
    if (routeName === '') {
      if (!this.isFirstLoad) {
        replaceHTML(document.body, this.initialContent);
      }
      const home = this.routes[0];
      home.view();
      this.isFirstLoad = false;
      window.scrollTo({ top: 0 });
      return;
    }
    const routeFinded = this.routes.find(route => routeName.startsWith(route.hashStart) && route.hashStart !== '');
    routeFinded.view();
    window.scrollTo({ top: 0 });
  }
};
