import Handlebars from "handlebars";
// @ts-ignore
import inputTemplate from "./input.hbs?raw";

interface InputData {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  accept?: string;
}

export function returnInput(data: InputData): string {
  return Handlebars.compile(inputTemplate)(data);
}