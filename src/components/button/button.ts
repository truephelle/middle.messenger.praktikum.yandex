import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import buttonTemplate from "./button.hbs?raw";
import Block from "../../utils/block";

interface ButtonProps {
  type: string;
  text: string;
  className?: string;
  onClick?: (event: Event) => void;
  events?: {
    click?: (event: Event) => void;
  };
}

class Button extends Block {
  constructor(props: ButtonProps) {
    const events = props.onClick ? { click: props.onClick } : {};
    super("button", { ...props, events });
  }

  protected init(): void {
    super.init();
    if (this._element) {
      if (this.props.type) {
        this._element.setAttribute('type', this.props.type);
      }
      if (this.props.href) {
        this._element.setAttribute('data-href', this.props.href);
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
