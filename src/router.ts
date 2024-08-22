export class Router {
  private routes: { [key: string]: () => void } = {};

  constructor() {
    window.addEventListener('popstate', () => this.handleLocation());
  }

  public add(route: string, action: () => void): void {
    this.routes[route] = action;
  }

  public navigate(path: string): void {
    window.history.pushState({}, path, window.location.origin + path);
    this.handleLocation();
  }

  public handleLocation(): void {
    const path = window.location.pathname;
    const routeAction = this.routes[path];

    if (routeAction) {
      routeAction();
    } else {
      this.routes['/']();
    }
  }
}
