import './style.css'
import './components/input/input.css'
import './components/button/button.css'
import './pages/forms/forms.css'
import './pages/forms/chat.css'
import './pages/main.css'
import { return404 } from './pages/errors/404.ts'
import { return500 } from './pages/errors/500.ts'
import { returnAuthorize } from './pages/forms/authorize.ts'
import { returnRegistrate } from './pages/forms/registrate.ts'
import { returnSettings } from './pages/forms/settings.ts'
import { returnChat } from './pages/forms/chat.ts'
import { Button } from './components/button/button.ts'
import { parseHtmlString } from './utils/domUtils.ts'
import { renderPage } from './utils/routingUtils.ts'
import {
  attachChatFormHandler,
  attachAuthorizeFormHandler,
  attachRegistrateFormHandler,
  attachSettingsFormHandler
} from './utils/formUtils.ts';

const app = document.querySelector('#app') as HTMLElement | null;

// Make route function globally accessible
(window as any).route = route;

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
        attachChatFormHandler();
      }
      break;
    case '/authorize':
      if (app) {
        renderPage(app, returnAuthorize());
        attachAuthorizeFormHandler();
      }
      break;
    case '/registrate':
      if (app) {
        renderPage(app, returnRegistrate());
        attachRegistrateFormHandler();
      }
      break;
    case '/settings':
      if (app) {
        renderPage(app, returnSettings());
        attachSettingsFormHandler();
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
    // Create a button element directly
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'button';
    button.textContent = link.text;
    button.addEventListener('click', (event) => {
      event.preventDefault();
      window.history.pushState({}, '', link.href);
      route();
    });
    if (list) {
      list.appendChild(button);
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