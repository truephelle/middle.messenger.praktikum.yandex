// @ts-expect-error TS7016: Could not find a declaration file for module
import settingsTemplate from "./settings.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

const formInstances: Record<string, any> = {};

export function returnSettings(): { container: HTMLElement; components: Record<string, any> } {
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
  
  const displayNameInput = new Input({
    id: "display_name",
    name: "display_name",
    label: "Отображаемое имя",
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
  
  const phoneInput = new Input({
    id: "phone",
    name: "phone",
    label: "Телефон",
    type: "tel",
    required: true
  });
  
  const avatarInput = new Input({
    id: "avatar",
    name: "avatar",
    label: "Аватар",
    type: "file",
    accept: "image/*"
  });
  
  const oldPasswordInput = new Input({
    id: "oldPassword",
    name: "oldPassword",
    label: "Старый пароль",
    type: "password"
  });
  
  const newPasswordInput = new Input({
    id: "newPassword",
    name: "newPassword",
    label: "Новый пароль",
    type: "password"
  });
  
  const submitButton = new Button({
    type: "submit",
    text: "Сохранить",
    className: "button"
  });

  formInstances.first_name = firstNameInput;
  formInstances.second_name = secondNameInput;
  formInstances.display_name = displayNameInput;
  formInstances.login = loginInput;
  formInstances.email = emailInput;
  formInstances.phone = phoneInput;
  formInstances.avatar = avatarInput;
  formInstances.oldPassword = oldPasswordInput;
  formInstances.newPassword = newPasswordInput;

  const container = document.createElement('div');
  container.className = 'form-container';
  
  const form = document.createElement('form');
  form.className = 'auth-form';
  form.id = 'settings-form';
  
  const title = document.createElement('h2');
  title.textContent = 'Настройки профиля';
  
  form.appendChild(title);
  form.appendChild(firstNameInput.getContent() as HTMLElement);
  form.appendChild(secondNameInput.getContent() as HTMLElement);
  form.appendChild(displayNameInput.getContent() as HTMLElement);
  form.appendChild(loginInput.getContent() as HTMLElement);
  form.appendChild(emailInput.getContent() as HTMLElement);
  form.appendChild(phoneInput.getContent() as HTMLElement);
  form.appendChild(avatarInput.getContent() as HTMLElement);
  
  const passwordTitle = document.createElement('h3');
  passwordTitle.textContent = 'Изменение пароля';
  form.appendChild(passwordTitle);
  
  form.appendChild(oldPasswordInput.getContent() as HTMLElement);
  form.appendChild(newPasswordInput.getContent() as HTMLElement);
  form.appendChild(submitButton.getContent() as HTMLElement);
  
  container.appendChild(form);

  return {
    container,
    components: formInstances
  };
}

export function getFormInstances(): Record<string, any> {
  return formInstances;
}
