import Handlebars from "handlebars";
import errorTemplate from "./error.hbs";

export function render404() {
  return Handlebars.compile(errorTemplate)({httpCode: 404, message: "Такой страницы не существует"});
}