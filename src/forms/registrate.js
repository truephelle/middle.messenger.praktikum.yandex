import Handlebars from "handlebars";
import regTemplate from "./registrate.hbs?raw";

export function returnRegistrate() {
  return Handlebars.compile(regTemplate)();
}
