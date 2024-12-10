import { getURLHash, replaceHTML } from '../js/utils.js';
import { routes } from './routes.js';

// Router prototype
export function Router() {
  this.routes = routes;
  this.isFirstLoad = true;
  // this.init();
}

Router.prototype = {
  constructor: Router,
  // Method to init the router
  init() {
    // Get the initial content
    this.initialContent = document.body.innerHTML;
    this.loadRoute();
  },

  async loadRoute() {
    // Load a path according to the hash of the url
    const routeName = getURLHash();
    // Render the home
    if (routeName === '') {
      if (!this.isFirstLoad) {
        // If home is not the first view loaded replace the current body for the intiial content
        replaceHTML(document.body, this.initialContent);
      }

      const home = this.routes[0];
      home.view();
      this.isFirstLoad = false;
      window.scrollTo({ top: 0 });
      return;
    }
    // If get this point, is because a different route to Home was found and it has to render it
    const routeFinded = this.routes.find(route => routeName.startsWith(route.hashStart) && route.hashStart !== '');
    routeFinded.view();
    window.scrollTo({ top: 0 });
  }
};
