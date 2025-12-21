import Handlebars from "handlebars";
// @ts-ignore
import buttonTemplate from "./button.hbs?raw";
import Block from "../../utils/block";

interface ButtonProps {
  type: string;
  text: string;
  className?: string;
  onClick?: (event: Event) => void;
}

class Button extends Block {
  constructor(props: ButtonProps) {
    super("div", props);
  }

  protected componentDidMount(): void {
    const buttonElement = this.getContent()?.querySelector('button');
    if (this.props.onClick) {
      if (buttonElement) {
        buttonElement.addEventListener('click', this.props.onClick);
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
