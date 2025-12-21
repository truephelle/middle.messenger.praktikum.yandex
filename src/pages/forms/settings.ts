import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import settingsTemplate from "./settings.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

export function returnSettings(): string {
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

  return Handlebars.compile(settingsTemplate)({
    firstNameInput: firstNameInput.getContent()?.outerHTML || '',
    secondNameInput: secondNameInput.getContent()?.outerHTML || '',
    displayNameInput: displayNameInput.getContent()?.outerHTML || '',
    loginInput: loginInput.getContent()?.outerHTML || '',
    emailInput: emailInput.getContent()?.outerHTML || '',
    phoneInput: phoneInput.getContent()?.outerHTML || '',
    avatarInput: avatarInput.getContent()?.outerHTML || '',
    oldPasswordInput: oldPasswordInput.getContent()?.outerHTML || '',
    newPasswordInput: newPasswordInput.getContent()?.outerHTML || '',
    submitButton: submitButton.getContent()?.outerHTML || ''
  });
}
