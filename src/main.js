import './style.css'
import { return404 } from './errors/404.js'
import { return500 } from './errors/500.js'
import { returnAuthorize } from './forms/authorize.js'
import { returnRegistrate } from './forms/registrate.js'
import { returnSettings } from './forms/settings.js'
import { returnChat } from './forms/chat.js'

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
      renderDefaultContent();
      break;
    case '/authorize':
      app.appendChild(parser.parseFromString(returnAuthorize(), "text/html").body.firstChild);
      break;
    case '/registrate':
      app.appendChild(parser.parseFromString(returnRegistrate(), "text/html").body.firstChild);
      break;
    case '/settings':
      app.appendChild(parser.parseFromString(returnSettings(), "text/html").body.firstChild);
      break;
    case '/chat':
      app.appendChild(parser.parseFromString(returnChat(), "text/html").body.firstChild);
      break;
    default:
      app.appendChild(parser.parseFromString(return404(), "text/html").body.firstChild);
  }
}

// Function to render default content using DOM methods only
function renderDefaultContent() {
  const container = document.createElement('div');
  container.className = 'main-page';
  
  const heading = document.createElement('h1');
  heading.textContent = 'Доступные страницы';
  container.appendChild(heading);
  
  const links = [
    { href: '/authorize', text: 'Авторизация' },
    { href: '/registrate', text: 'Регистрация' },
    { href: '/settings', text: 'Настройки' },
    { href: '/chat', text: 'Чат' },
    { href: '/404', text: 'Ошибка 404' },
    { href: '/500', text: 'Ошибка 500' }
  ];
  
  const list = document.createElement('ul');
  links.forEach(link => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.text;
    listItem.appendChild(anchor);
    list.appendChild(listItem);
  });
  
  container.appendChild(list);
  app.appendChild(container);
}

route();

window.addEventListener('popstate', route);
