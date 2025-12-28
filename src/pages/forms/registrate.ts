// @ts-expect-error TS7016: Could not find a declaration file for module
import regTemplate from "./registrate.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

const formInstances: Record<string, any> = {};

export function returnRegistrate(): { container: HTMLElement; components: Record<string, any> } {
  const firstNameInput = new Input({
    id: "first_name",
    name: "first_name",
    label: "Имя",
    type: "text",
    required: true
  });
  
  const secondNameInput = new Input({
    id: "second_name",
    name: "second_name",
    label: "Фамилия",
    type: "text",
    required: true
  });
  
  const loginInput = new Input({
    id: "login",
    name: "login",
    label: "Логин",
    type: "text",
    required: true
  });
  
  const emailInput = new Input({
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    required: true
  });
  
  const passwordInput = new Input({
    id: "password",
    name: "password",
    label: "Пароль",
    type: "password",
    required: true
  });
  
  const phoneInput = new Input({
    id: "phone",
    name: "phone",
    label: "Телефон",
    type: "tel",
    required: true
  });
  
  const submitButton = new Button({
    type: "submit",
    text: "Зарегистрироваться",
    className: "button"
  });

  formInstances.first_name = firstNameInput;
  formInstances.second_name = secondNameInput;
  formInstances.login = loginInput;
  formInstances.email = emailInput;
  formInstances.password = passwordInput;
  formInstances.phone = phoneInput;

  const container = document.createElement('div');
  container.className = 'form-container';
  
  const form = document.createElement('form');
  form.className = 'auth-form';
  form.id = 'registrate-form';
  
  const title = document.createElement('h2');
  title.textContent = 'Регистрация';
  
  form.appendChild(title);
  form.appendChild(firstNameInput.getContent() as HTMLElement);
  form.appendChild(secondNameInput.getContent() as HTMLElement);
  form.appendChild(loginInput.getContent() as HTMLElement);
  form.appendChild(emailInput.getContent() as HTMLElement);
  form.appendChild(passwordInput.getContent() as HTMLElement);
  form.appendChild(phoneInput.getContent() as HTMLElement);
  form.appendChild(submitButton.getContent() as HTMLElement);
  
  const footer = document.createElement('div');
  footer.className = 'form-footer';
  
  const link = document.createElement('a');
  link.href = '/authorize';
  link.textContent = 'Уже есть аккаунт? Войдите';
  
  footer.appendChild(link);
  form.appendChild(footer);
  container.appendChild(form);

  return {
    container,
    components: formInstances
  };
}

export function getFormInstances(): Record<string, any> {
  return formInstances;
}
