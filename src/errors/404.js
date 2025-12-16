import Handlebars from "handlebars";
import errorTemplate from "./error.hbs?raw";

export function return404() {
  return Handlebars.compile(errorTemplate)({httpCode: 404, message: "Такой страницы не существует"});
}