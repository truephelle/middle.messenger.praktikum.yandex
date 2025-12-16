import Handlebars from "handlebars";
import listItemTemplate from "./listItem.hbs?raw";

export function returnListItem(data) {
  return Handlebars.compile(listItemTemplate)(data);
}