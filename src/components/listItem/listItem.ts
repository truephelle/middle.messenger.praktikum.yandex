import Handlebars from "handlebars";
// @ts-ignore
import listItemTemplate from "./listItem.hbs?raw";

interface ListItemData {
  href: string;
  text: string;
}

export function returnListItem(data: ListItemData): string {
  return Handlebars.compile(listItemTemplate)(data);
}