import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import errorTemplate from "./error.hbs?raw";

export function return500(): string {
  return Handlebars.compile(errorTemplate)({httpCode: 500, message: "Ошибка у нас"});
}
