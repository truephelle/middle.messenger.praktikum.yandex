import './style.css'
import { return404 } from './errors/404.js'
import { return500 } from './errors/500.js'
import { returnAuthorize } from './forms/authorize.js'
import { returnRegistrate } from './forms/registrate.js'
import { returnSettings } from './forms/settings.js'
import { returnChat } from './forms/chat.js'
import { returnListItem } from './components/listItem/listItem.js'
import { parseHtmlString } from './utils/domUtils.js'

const app = document.querySelector('#app');

// Simple routing based on URL path
function route() {
  const path = window.location.pathname;
  
  // Clear the app container
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
  
  switch (path) {
    case '/':
      renderDefaultContent();
      break;
    case '/chat':
      app.appendChild(parseHtmlString(returnChat()));
      break;
    case '/authorize':
      app.appendChild(parseHtmlString(returnAuthorize()));
      break;
    case '/registrate':
      app.appendChild(parseHtmlString(returnRegistrate()));
      break;
    case '/settings':
      app.appendChild(parseHtmlString(returnSettings()));
      break;
    case '/500':
      app.appendChild(parseHtmlString(return500()));
      break;
    default:
      app.appendChild(parseHtmlString(return404()));
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
    const listItemHtml = returnListItem(link);
    const listItem = parseHtmlString(listItemHtml);
    list.appendChild(listItem);
  });
  
  container.appendChild(list);
  app.appendChild(container);
}

route();

window.addEventListener('popstate', route);
