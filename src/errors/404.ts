import Handlebars from "handlebars";
// @ts-ignore
import errorTemplate from "./error.hbs?raw";

export function return404(): string {
  return Handlebars.compile(errorTemplate)({httpCode: 404, message: "Такой страницы не существует"});
}