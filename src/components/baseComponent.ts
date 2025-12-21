import Block from '../utils/block';

interface ComponentProps {
  [key: string]: any;
}

class Component extends Block {
  protected template: (data: any) => string;

  constructor(tagName: string = "div", props: ComponentProps = {}, template: (data: any) => string) {
    super(tagName, props);
    this.template = template;
  }

  protected render(): string {
    return this.template(this.props);
  }
}

export default Component;