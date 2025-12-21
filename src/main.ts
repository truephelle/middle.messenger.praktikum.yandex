import './style.css'
import { return404 } from './errors/404.ts'
import { return500 } from './errors/500.ts'
import { returnAuthorize } from './forms/authorize.ts'
import { returnRegistrate } from './forms/registrate.ts'
import { returnSettings } from './forms/settings.ts'
import { returnChat } from './forms/chat.ts'
import { returnListItem } from './components/listItem/listItem.ts'
import { parseHtmlString } from './utils/domUtils.ts'

const app = document.querySelector('#app') as HTMLElement | null;

// Simple routing based on URL path
function route() {
  const path = window.location.pathname;
  
  // Clear the app container
  if (app) {
    while (app.firstChild) {
      app.removeChild(app.firstChild);
    }
  }
  
  switch (path) {
    case '/':
      renderDefaultContent();
      break;
    case '/chat':
      if (app) {
        const element = parseHtmlString(returnChat());
        if (element) {
          app.appendChild(element);
        }
      }
      break;
    case '/authorize':
      if (app) {
        const element = parseHtmlString(returnAuthorize());
        if (element) {
          app.appendChild(element);
        }
      }
      break;
    case '/registrate':
      if (app) {
        const element = parseHtmlString(returnRegistrate());
        if (element) {
          app.appendChild(element);
        }
      }
      break;
    case '/settings':
      if (app) {
        const element = parseHtmlString(returnSettings());
        if (element) {
          app.appendChild(element);
        }
      }
      break;
    case '/500':
      if (app) {
        const element = parseHtmlString(return500());
        if (element) {
          app.appendChild(element);
        }
      }
      break;
    default:
      if (app) {
        const element = parseHtmlString(return404());
        if (element) {
          app.appendChild(element);
        }
      }
  }
}

// Function to render default content using DOM methods only
function renderDefaultContent() {
  const container = document.createElement('div');
  container.className = 'main-page';
  
  const heading = document.createElement('h1');
  heading.textContent = 'Доступные страницы';
  container.appendChild(heading);
  
  const nav = document.createElement('nav');
  
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
    if (listItem && list) {
      list.appendChild(listItem);
    }
  });
  
  nav.appendChild(list);
  if (app) {
    container.appendChild(nav);
    app.appendChild(container);
  }
}

route();

window.addEventListener('popstate', route);