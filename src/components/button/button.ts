import Handlebars from "handlebars";
// @ts-ignore
import buttonTemplate from "./button.hbs?raw";

interface ButtonData {
  type: string;
  text: string;
  className?: string;
  href?: string;
}

export function returnButton(data: ButtonData): string {
  return Handlebars.compile(buttonTemplate)(data);
}