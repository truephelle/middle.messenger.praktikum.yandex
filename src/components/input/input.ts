import Handlebars from "handlebars";
// @ts-expect-error TS7016: Could not find a declaration file for module
import inputTemplate from "./input.hbs?raw";
import Block from "../../utils/block";
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
  className?: string;
  events?: {
    focusin?: (event: Event) => void;
    focusout?: (event: Event) => void;
  };
}

class Input extends Block {
  
  constructor(props: InputProps) {
    const defaultEvents = {
      focusin: (e: Event) => {
        console.log('focusin event triggered!', e);
        this.clearError();
      },
      focusout: (e: Event) => {
        console.log('focusout event triggered!', e);
        this.handleValidation();
      }
    };
    console.log(`default events {${Object.entries(defaultEvents).map(([k, v]) => `${k}: ${typeof v}`).join(', ')}}`);
    const events = { ...defaultEvents, ...props.events };
    console.log(`overall events are {${Object.entries(events).map(([k, v]) => `${k}: ${typeof v}`).join(', ')}}`);
    super("div", { ...props, events, className: "form-group" });
  }

  public validate(): boolean {
    console.log("running validation");
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return true;
    
    const value = inputElement.value;
    const fieldName = this.props.name;
    
    const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];

    console.log(`found rule  ${rule}`);
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
    console.log('clearError');
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return;
    
    inputElement.classList.remove('field-error');
    
    globalEventBus.emit('input.focus', inputElement);
  }

  private handleValidation(): void {
    console.log('handleValidation');
    const inputElement = this.getContent()?.querySelector('input') as HTMLInputElement;
    if (!inputElement) return;
    
    const fieldName = this.props.name;
    const value = inputElement.value;
    
    let formElement = inputElement.closest('form') as HTMLFormElement;
    const formId = formElement?.id || 'unknown';
    
    const error = this.validate() ? null : this.getValidationMessage(value);
    
    if (error) {
      globalEventBus.emit('form.validation.error', { formId, fieldName, message: error });
    } else {
      globalEventBus.emit('form.validation.success', { formId, fieldName });
    }
  }

  private getValidationMessage(value: string): string | null {
    const fieldName = this.props.name;
    
    const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
    if (rule && !rule.pattern.test(value)) {
      return rule.message;
    }
    
    if (this.props.regex && !this.props.regex.test(value)) {
      return 'Invalid format';
    }
    
    return null;
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
