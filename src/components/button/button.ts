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
    // Convert onClick to events prop for proper event handling
    const events = props.onClick ? { click: props.onClick } : {};
    super("button", { ...props, events });
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
