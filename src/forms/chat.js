import Handlebars from "handlebars";
import chatTemplate from "./chat.hbs?raw";

export function returnChat() {
  return Handlebars.compile(chatTemplate)();
}