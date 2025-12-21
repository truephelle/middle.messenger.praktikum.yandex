import Handlebars from "handlebars";
// @ts-ignore
import chatTemplate from "./chat.hbs?raw";

export function returnChat(): string {
  return Handlebars.compile(chatTemplate)({});
}