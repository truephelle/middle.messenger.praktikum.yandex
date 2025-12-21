import Handlebars from "handlebars";
// @ts-ignore
import buttonTemplate from "./button.hbs?raw";
import Block from "../../utils/block";

interface ButtonProps {
  type: string;
  text: string;
  className?: string;
  href?: string;
  onClick?: (event: Event) => void;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  protected componentDidMount(): void {
    // Add event listener for click if onClick handler is provided
    if (this.props.onClick) {
      const buttonElement = this.getContent()?.querySelector('button');
      if (buttonElement) {
        buttonElement.addEventListener('click', this.props.onClick);
      }
    }
    
    // For buttons with href, add navigation behavior
    if (this.props.href) {
      const buttonElement = this.getContent()?.querySelector('button');
      if (buttonElement) {
        buttonElement.addEventListener('click', (event) => {
          event.preventDefault();
          window.history.pushState({}, '', this.props.href);
          // Call the route function directly instead of dispatching event
          window.dispatchEvent(new PopStateEvent('popstate'));
        });
      }
    }
  }

  protected render(): string {
    return Handlebars.compile(buttonTemplate)(this.props);
  }
}

export { Button, ButtonProps };
export function returnButton(data: ButtonProps): string {
  const button = new Button(data);
  return button.getContent()?.outerHTML || '';
}