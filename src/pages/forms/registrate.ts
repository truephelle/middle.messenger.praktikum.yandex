import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import regTemplate from "./registrate.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

export function returnRegistrate(): string {
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

  return Handlebars.compile(regTemplate)({
    firstNameInput: firstNameInput.getContent()?.outerHTML || '',
    secondNameInput: secondNameInput.getContent()?.outerHTML || '',
    loginInput: loginInput.getContent()?.outerHTML || '',
    emailInput: emailInput.getContent()?.outerHTML || '',
    passwordInput: passwordInput.getContent()?.outerHTML || '',
    phoneInput: phoneInput.getContent()?.outerHTML || '',
    submitButton: submitButton.getContent()?.outerHTML || ''
  });
}
