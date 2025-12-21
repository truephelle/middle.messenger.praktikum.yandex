import Handlebars from "handlebars";
// @ts-ignore
import regTemplate from "./registrate.hbs?raw";

export function returnRegistrate(): string {
  return Handlebars.compile(regTemplate)({});
}