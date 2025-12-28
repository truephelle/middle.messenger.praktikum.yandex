import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import authorizeTemplate from "./authorize.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

// Store component instances for validation
const formInstances: Record<string, any> = {};

export function returnAuthorize(): { container: HTMLElement; components: { login: Input; password: Input; button: Button } } {
  console.log('Creating authorize page components...');
  
  const loginInput = new Input({
    id: "login",
    name: "login",
    label: "Логин",
    type: "text",
    required: true
  });
  
  const passwordInput = new Input({
    id: "password",
    name: "password",
    label: "Пароль",
    type: "password",
    required: true
  });
  
  const submitButton = new Button({
    type: "submit",
    text: "Войти",
    className: "button"
  });

  console.log('Login input element:', loginInput.getContent());
  console.log('Password input element:', passwordInput.getContent());

  // Store instances for validation
  formInstances.login = loginInput;
  formInstances.password = passwordInput;

  // Create container and add components directly
  const container = document.createElement('div');
  container.className = 'form-container';
  
  const form = document.createElement('form');
  form.className = 'auth-form';
  form.id = 'authorize-form';
  
  const title = document.createElement('h2');
  title.textContent = 'Авторизация';
  
  form.appendChild(title);
  form.appendChild(loginInput.getContent() as HTMLElement);
  form.appendChild(passwordInput.getContent() as HTMLElement);
  form.appendChild(submitButton.getContent() as HTMLElement);
  
  const footer = document.createElement('div');
  footer.className = 'form-footer';
  
  const link = document.createElement('a');
  link.href = '/registrate';
  link.textContent = 'Нет аккаунта? Зарегистрируйтесь';
  
  footer.appendChild(link);
  form.appendChild(footer);
  container.appendChild(form);

  console.log('Final container HTML:', container.outerHTML);

  return {
    container,
    components: {
      login: loginInput,
      password: passwordInput,
      button: submitButton
    }
  };
}

export function getFormInstances(): Record<string, any> {
  return formInstances;
}
