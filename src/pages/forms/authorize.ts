import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import authorizeTemplate from "./authorize.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

// Store component instances for validation
const formInstances: Record<string, any> = {};

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

  // Store instances for validation
  formInstances.login = loginInput;
  formInstances.password = passwordInput;

  return Handlebars.compile(authorizeTemplate)({
    loginInput: loginInput.getContent()?.outerHTML || '',
    passwordInput: passwordInput.getContent()?.outerHTML || '',
    submitButton: submitButton.getContent()?.outerHTML || ''
  });
}

export function getFormInstances(): Record<string, any> {
  return formInstances;
}
