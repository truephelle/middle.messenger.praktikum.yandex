import Handlebars from "handlebars";
// @ts-ignore
import authorizeTemplate from "./authorize.hbs?raw";
import { returnInput } from '../../components/input/input.ts';
import { returnButton } from '../../components/button/button.ts';

export function returnAuthorize(): string {
  const loginInput = returnInput({
    id: "login",
    name: "login",
    label: "Логин",
    type: "text",
    required: true
  });
  
  const passwordInput = returnInput({
    id: "password",
    name: "password",
    label: "Пароль",
    type: "password",
    required: true
  });
  
  const submitButton = returnButton({
    type: "submit",
    text: "Войти",
    className: "button"
  });

  return Handlebars.compile(authorizeTemplate)({
    loginInput,
    passwordInput,
    submitButton
  });
}