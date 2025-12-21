import { parseHtmlString } from './domUtils.ts';

export function renderPage(app: HTMLElement, htmlContent: string): void {
  const element = parseHtmlString(htmlContent);
  if (element) {
    app.appendChild(element);
  }
}