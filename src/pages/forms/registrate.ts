import Handlebars from "handlebars";
// @ts-ignore
import regTemplate from "./registrate.hbs?raw";
import { returnInput } from '../../components/input/input.ts';
import { returnButton } from '../../components/button/button.ts';

export function returnRegistrate(): string {
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
  
  const passwordInput = returnInput({
    id: "password",
    name: "password",
    label: "Пароль",
    type: "password",
    required: true
  });
  
  const phoneInput = returnInput({
    id: "phone",
    name: "phone",
    label: "Телефон",
    type: "tel",
    required: true
  });
  
  const submitButton = returnButton({
    type: "submit",
    text: "Зарегистрироваться",
    className: "button"
  });

  return Handlebars.compile(regTemplate)({
    firstNameInput,
    secondNameInput,
    loginInput,
    emailInput,
    passwordInput,
    phoneInput,
    submitButton
  });
}