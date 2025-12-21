import Handlebars from "handlebars";
// @ts-ignore
import authorizeTemplate from "./authorize.hbs?raw";
import { Input } from '../../components/input/input.ts';
import { Button } from '../../components/button/button.ts';

export function returnAuthorize(): string {
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

  return Handlebars.compile(authorizeTemplate)({
    loginInput: loginInput.getContent()?.outerHTML || '',
    passwordInput: passwordInput.getContent()?.outerHTML || '',
    submitButton: submitButton.getContent()?.outerHTML || ''
  });
}
