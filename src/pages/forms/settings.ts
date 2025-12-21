import Handlebars from "handlebars";
// @ts-ignore
import settingsTemplate from "./settings.hbs?raw";
import { returnInput } from '../../components/input/input.ts';
import { returnButton } from '../../components/button/button.ts';

export function returnSettings(): string {
  const firstNameInput = returnInput({
    id: "first_name",
    name: "first_name",
    label: "Имя",
    type: "text",
    required: true
  });
  
  const secondNameInput = returnInput({
    id: "second_name",
    name: "second_name",
    label: "Фамилия",
    type: "text",
    required: true
  });
  
  const displayNameInput = returnInput({
    id: "display_name",
    name: "display_name",
    label: "Отображаемое имя",
    type: "text",
    required: true
  });
  
  const loginInput = returnInput({
    id: "login",
    name: "login",
    label: "Логин",
    type: "text",
    required: true
  });
  
  const emailInput = returnInput({
    id: "email",
    name: "email",
    label: "Email",
    type: "email",
    required: true
  });
  
  const phoneInput = returnInput({
    id: "phone",
    name: "phone",
    label: "Телефон",
    type: "tel",
    required: true
  });
  
  const avatarInput = returnInput({
    id: "avatar",
    name: "avatar",
    label: "Аватар",
    type: "file",
    accept: "image/*"
  });
  
  const oldPasswordInput = returnInput({
    id: "oldPassword",
    name: "oldPassword",
    label: "Старый пароль",
    type: "password"
  });
  
  const newPasswordInput = returnInput({
    id: "newPassword",
    name: "newPassword",
    label: "Новый пароль",
    type: "password"
  });
  
  const submitButton = returnButton({
    type: "submit",
    text: "Сохранить",
    className: "button"
  });

  return Handlebars.compile(settingsTemplate)({
    firstNameInput,
    secondNameInput,
    displayNameInput,
    loginInput,
    emailInput,
    phoneInput,
    avatarInput,
    oldPasswordInput,
    newPasswordInput,
    submitButton
  });
}