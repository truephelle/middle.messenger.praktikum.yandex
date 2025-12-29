import './style.css'
import './components/input/input.css'
import './components/button/button.css'
import './pages/forms/forms.css'
import './pages/forms/chat.css'
import './pages/main.css'
import { return404 } from './pages/errors/404'
import { return500 } from './pages/errors/500'
import { returnAuthorize } from './pages/forms/authorize'
import { returnRegistrate } from './pages/forms/registrate'
import { returnSettings } from './pages/forms/settings'
import { returnChat } from './pages/forms/chat'
import { Button } from './components/button/button'
import { renderPage } from './utils/routingUtils'
import {
  attachChatFormHandler,
  attachAuthorizeFormHandler,
  attachRegistrateFormHandler,
  attachSettingsFormHandler
} from './utils/formUtils';

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
        const chatData = returnChat();
        app.appendChild(chatData.container);
        attachChatFormHandler();
      }
      break;
    case '/authorize':
      if (app) {
        const authorizeData = returnAuthorize();
        app.appendChild(authorizeData.container);
        attachAuthorizeFormHandler();
      }
      break;
    case '/registrate':
      if (app) {
        const registrateData = returnRegistrate();
        app.appendChild(registrateData.container);
        attachRegistrateFormHandler();
      }
      break;
    case '/settings':
      if (app) {
        const settingsData = returnSettings();
        app.appendChild(settingsData.container);
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
    const buttonWrapper = document.createElement('li');
    const button = new Button({
      type: 'button',
      text: link.text,
      className: 'button',
      onClick: () => {
        window.location.href = link.href;
      }
    });
    
    buttonWrapper.appendChild(button.getContent() as Node);
    list.appendChild(buttonWrapper);
  });
  
  nav.appendChild(list);
  if (app) {
    container.appendChild(nav);
    app.appendChild(container);
  }
}

route();

window.addEventListener('popstate', route);
