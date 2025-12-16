import Handlebars from "handlebars";
import settingsTemplate from "./settings.hbs?raw";

export function returnSettings() {
  return Handlebars.compile(settingsTemplate)();
}