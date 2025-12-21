import Handlebars from "handlebars";
// @ts-ignore
import settingsTemplate from "./settings.hbs?raw";

export function returnSettings(): string {
  return Handlebars.compile(settingsTemplate)({});
}