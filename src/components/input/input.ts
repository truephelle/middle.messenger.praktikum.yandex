import Handlebars from "handlebars";
// @ts-ignore
import inputTemplate from "./input.hbs?raw";
import Block from "../../utils/block";
import EventBus from "../../utils/eventBus";
import globalEventBus from "../../utils/globalEventBus";
import { VALIDATION_RULES } from "../../utils/validationUtils";

interface InputProps {
  id: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  accept?: string;
  regex?: RegExp;
}

class Input extends Block {
  private inputEventBus: EventBus;
  
  constructor(props: InputProps) {
    super("div", props);
    this.inputEventBus = new EventBus();
    
    this.inputEventBus.on('input.validation.error', () => {});
    this.inputEventBus.on('input.validation.success', () => {});
    
    globalEventBus.on('input.validation.error', () => {});
    globalEventBus.on('input.validation.success', () => {});
    globalEventBus.on('form.validation.error', () => {});
    globalEventBus.on('form.validation.success', () => {});
    globalEventBus.on('input.focus', () => {});
  }

  protected componentDidMount(): void {
    const inputElement = this.getContent()?.querySelector('input');
    if (inputElement) {
      inputElement.addEventListener('blur', () => {
        this.validate();
      });
      
      inputElement.addEventListener('input', () => {
        this.clearError();
      });
    }
  }

  public validate(): boolean {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return true;
    
    const value = inputElement.value;
    const fieldName = this.props.name;
    
    const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
    if (rule) {
      if (!rule.pattern.test(value)) {
        this.showError(rule.message);
        globalEventBus.emit('input.validation.error', { fieldName, message: rule.message });
        return false;
      } else {
        this.clearError();
        globalEventBus.emit('input.validation.success', { fieldName });
        return true;
      }
    }
    
    if (this.props.regex) {
      if (!this.props.regex.test(value)) {
        this.showError('Invalid format');
        globalEventBus.emit('input.validation.error', { fieldName, message: 'Invalid format' });
        return false;
      } else {
        this.clearError();
        globalEventBus.emit('input.validation.success', { fieldName });
        return true;
      }
    }
    
    this.clearError();
    globalEventBus.emit('input.validation.success', { fieldName });
    return true;
  }

  private showError(message: string): void {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return;
    
    this.clearError();
    inputElement.classList.add('field-error');
    
    globalEventBus.emit('input.validation.error', {
      fieldName: this.props.name,
      message: message
    });
  }

  private clearError(): void {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return;
    
    inputElement.classList.remove('field-error');
    
    globalEventBus.emit('input.focus', inputElement);
  }

  public on(event: string, callback: (...args: any[]) => void): void {
    this.inputEventBus.on(event, callback);
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
