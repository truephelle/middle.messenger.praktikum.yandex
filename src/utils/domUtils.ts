export function parseHtmlString(htmlString: string): ChildNode | null {
  const parser = new DOMParser();
  return parser.parseFromString(htmlString, "text/html").body.firstChild;
}
