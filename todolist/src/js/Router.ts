type Route = {
  hash: string;
  callback: () => void;
};
export default class Router {
  routes: Route[] = [];
  onLoadNotFound = () => {};

  constructor() {
    this.init();
  }

  addRoute(hash: string, callback: () => void) {
    this.routes.push({ hash, callback });

    return this;
  }

  setNotFound(callback: () => void) {
    this.onLoadNotFound = callback;
  }

  init() {
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    if (!window.location.hash) {
      window.location.hash = "#/";
    }
  }

  onHashChange() {
    const route = this.routes.find(
      (route) => route.hash === window.location.hash,
    );
    if (!route) {
      return this.onLoadNotFound();
    }
    route.callback();
  }
}
