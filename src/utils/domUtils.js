export function parseHtmlString(htmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html").body.firstChild;
}
