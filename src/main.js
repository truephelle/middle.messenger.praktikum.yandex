import './style.css'
import { return404 } from './errors/404.js'
import { return500 } from './errors/500.js'
import { returnAuthorize } from './forms/authorize.js'
import { returnRegistrate } from './forms/registrate.js'
import { returnSettings } from './forms/settings.js'

const app = document.querySelector('#app');

// Simple routing based on URL path
function route() {
  const path = window.location.pathname;
  
  // Clear the app container
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  
  let parser = new DOMParser();
  switch (path) {
    case '/500':
      app.appendChild(parser.parseFromString(return500(), "text/html").body.firstChild);
      break;
    case '/':
      window.location.pathname = '/authorize';
    case '/authorize':
      app.appendChild(parser.parseFromString(returnAuthorize(), "text/html").body.firstChild);
      break;
    case '/registrate':
      app.appendChild(parser.parseFromString(returnRegistrate(), "text/html").body.firstChild);
      break;
    case '/settings':
      app.appendChild(parser.parseFromString(returnSettings(), "text/html").body.firstChild);
      break;
    default:
      app.appendChild(parser.parseFromString(return404(), "text/html").body.firstChild);
  }
}

route();

window.addEventListener('popstate', route);
