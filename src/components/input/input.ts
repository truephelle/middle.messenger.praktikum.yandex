import Handlebars from "handlebars";
// @ts-ignore
import inputTemplate from "./input.hbs?raw";
import Block from "../../utils/block";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  accept?: string;
}

class Input extends Block {
  constructor(props: InputProps) {
    super("div", props);
  }

  protected render(): string {
    return Handlebars.compile(inputTemplate)(this.props);
  }
}

export { Input, InputProps };
export function returnInput(data: InputProps): string {
  const input = new Input(data);
  return input.getContent()?.outerHTML || '';
}