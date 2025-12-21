import Handlebars from "handlebars";
// @ts-ignore
import chatTemplate from "./chat.hbs?raw";
import { Input } from '../../components/input/input.ts';
import { Button } from '../../components/button/button.ts';

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