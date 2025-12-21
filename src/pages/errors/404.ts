import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import errorTemplate from "./error.hbs?raw";

export function return404(): string {
  return Handlebars.compile(errorTemplate)({httpCode: 404, message: "Такой страницы не существует"});
}
