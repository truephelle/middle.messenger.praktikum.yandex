import Handlebars from "handlebars";
import errorTemplate from "./error.hbs?raw";

export function return500() {
  return Handlebars.compile(errorTemplate)({httpCode: 500, message: "Ошибка у нас"});
}
