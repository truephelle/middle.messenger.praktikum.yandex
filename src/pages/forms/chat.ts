import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import chatTemplate from "./chat.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

export function returnChat(): string {
  const messageInput = new Input({
    id: "message-input",
    name: "message",
    label: "",
    type: "text",
    placeholder: "Введите сообщение...",
    required: true
  });
  
  const submitButton = new Button({
    type: "submit",
    text: "Отправить"
  });

  return Handlebars.compile(chatTemplate)({
    messageInput: messageInput.getContent()?.outerHTML || '',
    submitButton: submitButton.getContent()?.outerHTML || ''
  });
}
