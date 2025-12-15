import Handlebars from "handlebars";
import errorTemplate from "./error.hbs";

export function render500() {
  return Handlebars.compile(errorTemplate)({httpCode: 500, message: "Ошибка у нас"});
}