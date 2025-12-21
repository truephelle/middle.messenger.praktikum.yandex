import './style.css'
import { return404 } from './errors/404.ts'
import { return500 } from './errors/500.ts'
import { returnAuthorize } from './forms/authorize.ts'
import { returnRegistrate } from './forms/registrate.ts'
import { returnSettings } from './forms/settings.ts'
import { returnChat } from './forms/chat.ts'
import { returnListItem } from './components/listItem/listItem.ts'
import { parseHtmlString } from './utils/domUtils.ts'
import { renderPage } from './utils/routingUtils.ts'

const app = document.querySelector('#app') as HTMLElement | null;

function route() {
  const path = window.location.pathname;
  
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
        renderPage(app, returnChat());
      }
      break;
    case '/authorize':
      if (app) {
        renderPage(app, returnAuthorize());
      }
      break;
    case '/registrate':
      if (app) {
        renderPage(app, returnRegistrate());
      }
      break;
    case '/settings':
      if (app) {
        renderPage(app, returnSettings());
      }
      break;
    case '/500':
      if (app) {
        renderPage(app, return500());
      }
      break;
    default:
      if (app) {
        renderPage(app, return404());
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