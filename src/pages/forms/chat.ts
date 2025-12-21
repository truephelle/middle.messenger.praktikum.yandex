import Handlebars from "handlebars";
// @ts-ignore
import chatTemplate from "./chat.hbs?raw";
import { returnInput } from '../../components/input/input.ts';
import { returnButton } from '../../components/button/button.ts';

export function returnChat(): string {
  const messageInput = returnInput({
    id: "message-input",
    name: "message",
    label: "",
    type: "text",
    placeholder: "Введите сообщение...",
    required: true
  });
  
  const submitButton = returnButton({
    type: "submit",
    text: "Отправить"
  });

  return Handlebars.compile(chatTemplate)({
    messageInput,
    submitButton
  });
}