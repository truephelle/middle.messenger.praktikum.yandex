import Handlebars from "handlebars";
// @ts-ignore
import authorizeTemplate from "./authorize.hbs?raw";

export function returnAuthorize(): string {
  return Handlebars.compile(authorizeTemplate)({});
}