import { parseHtmlString } from './domUtils';

export function renderPage(app: HTMLElement, htmlContent: string): void {
  const element = parseHtmlString(htmlContent);
  if (element) {
    app.appendChild(element);
  }
}
