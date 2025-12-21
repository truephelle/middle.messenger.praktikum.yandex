import Handlebars from "handlebars";
// @ts-ignore
import errorTemplate from "./error.hbs?raw";

export function return500(): string {
  return Handlebars.compile(errorTemplate)({httpCode: 500, message: "Ошибка у нас"});
}
