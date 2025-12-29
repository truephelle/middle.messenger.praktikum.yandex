// @ts-expect-error TS7016: Could not find a declaration file for module
import authorizeTemplate from "./authorize.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

const formInstances: Record<string, any> = {};

export function returnAuthorize(): { container: HTMLElement; components: { login: Input; password: Input; button: Button } } {
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


  formInstances.login = loginInput;
  formInstances.password = passwordInput;

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
