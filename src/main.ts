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
import { returnButton } from './components/button/button.ts'
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
    // Create a button that acts as a link
    const buttonHtml = returnButton({
      type: 'button',
      text: link.text,
      className: 'button',
      href: link.href
    });
    const button = parseHtmlString(buttonHtml);
    if (button && list) {
      list.appendChild(button);
    }
  });
  
  nav.appendChild(list);
  if (app) {
    container.appendChild(nav);
    app.appendChild(container);
  }
  
  // Add event listeners to buttons after they're added to the DOM
  setTimeout(() => {
    const buttons = document.querySelectorAll('.button[data-href]');
    buttons.forEach(button => {
      button.addEventListener('click', function(this: HTMLElement) {
        const href = this.getAttribute('data-href');
        if (href) {
          window.history.pushState({}, '', href);
          route();
        }
      });
    });
  }, 0);
}

route();

window.addEventListener('popstate', route);