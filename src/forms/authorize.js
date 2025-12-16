import Handlebars from "handlebars";
import authorizeTemplate from "./authorize.hbs?raw";

export function returnAuthorize() {
  return Handlebars.compile(authorizeTemplate)();
}
