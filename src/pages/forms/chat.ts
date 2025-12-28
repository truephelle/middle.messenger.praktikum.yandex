import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import chatTemplate from "./chat.hbs?raw";
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';

const formInstances: Record<string, any> = {};

export function returnChat(): { container: HTMLElement; components: Record<string, any> } {
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

  formInstances.message = messageInput;

  const container = document.createElement('div');
  container.className = 'chat-container';
  
  const chatWindow = document.createElement('div');
  chatWindow.className = 'chat-window';
  
  const chatSidebar = document.createElement('div');
  chatSidebar.className = 'chat-sidebar';
  
  const chatHeader = document.createElement('div');
  chatHeader.className = 'chat-header';
  
  const settingsLink = document.createElement('a');
  settingsLink.href = '/settings';
  settingsLink.className = 'settings-link';
  settingsLink.textContent = 'Настройки';
  
  chatHeader.appendChild(settingsLink);
  chatSidebar.appendChild(chatHeader);
  
  const chatList = document.createElement('div');
  chatList.className = 'chat-list';
  chatSidebar.appendChild(chatList);
  
  const chatMain = document.createElement('div');
  chatMain.className = 'chat-main';
  
  const chatMessages = document.createElement('div');
  chatMessages.className = 'chat-messages';
  chatMain.appendChild(chatMessages);
  
  const messageForm = document.createElement('div');
  messageForm.className = 'message-form';
  
  const form = document.createElement('form');
  form.id = 'message-form';
  
  form.appendChild(messageInput.getContent() as HTMLElement);
  form.appendChild(submitButton.getContent() as HTMLElement);
  
  messageForm.appendChild(form);
  chatMain.appendChild(messageForm);
  
  chatWindow.appendChild(chatSidebar);
  chatWindow.appendChild(chatMain);
  container.appendChild(chatWindow);

  return {
    container,
    components: formInstances
  };
}

export function getFormInstances(): Record<string, any> {
  return formInstances;
}
