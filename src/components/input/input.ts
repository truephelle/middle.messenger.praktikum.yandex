import Handlebars from "handlebars";
// @ts-ignore
import inputTemplate from "./input.hbs?raw";
import Block from "../../utils/block";
import EventBus from "../../utils/eventBus";

// Validation rules
const VALIDATION_RULES = {
  first_name: {
    pattern: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    message: 'Имя должно начинаться с заглавной буквы и содержать только буквы и дефис'
  },
  second_name: {
    pattern: /^[A-ZА-Я][a-zA-Zа-яА-Я-]*$/,
    message: 'Фамилия должна начинаться с заглавной буквы и содержать только буквы и дефис'
  },
  login: {
    pattern: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    message: 'Логин должен содержать от 3 до 20 символов, начинаться с буквы и может содержать буквы, цифры, дефис и подчеркивание'
  },
  email: {
    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Некорректный email адрес'
  },
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
    message: 'Пароль должен содержать от 8 до 40 символов, включая хотя бы одну заглавную букву и одну цифру'
  },
  phone: {
    pattern: /^\+?\d{10,15}$/,
    message: 'Телефон должен содержать от 10 до 15 цифр и может начинаться с плюса'
  },
  message: {
    pattern: /.+/,
    message: 'Сообщение не должно быть пустым'
  }
};

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
    
    // Register event listeners to prevent errors
    this.inputEventBus.on('input.validation.error', () => {});
    this.inputEventBus.on('input.validation.success', () => {});
  }

  protected componentDidMount(): void {
    // Add blur validation
    const inputElement = this.getContent()?.querySelector('input');
    if (inputElement) {
      inputElement.addEventListener('blur', () => {
        this.validate();
      });
      
      // Clear error when user starts typing
      inputElement.addEventListener('input', () => {
        this.clearError();
      });
    }
  }

  // Validate the input field
  public isValid(): boolean {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return true;
    
    const value = inputElement.value;
    const fieldName = this.props.name;
    
    // Check if we have a specific validation rule for this field
    const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
    if (rule) {
      return rule.pattern.test(value);
    }
    
    // If we have a custom regex, use it
    if (this.props.regex) {
      return this.props.regex.test(value);
    }
    
    // If no validation rule, consider it valid
    return true;
  }

  // Validate and show error if invalid
  public validate(): boolean {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return true;
    
    const value = inputElement.value;
    const fieldName = this.props.name;
    
    // Check if we have a specific validation rule for this field
    const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
    if (rule) {
      if (!rule.pattern.test(value)) {
        this.showError(rule.message);
        this.inputEventBus.emit('input.validation.error', { fieldName, message: rule.message });
        return false;
      } else {
        this.clearError();
        this.inputEventBus.emit('input.validation.success', { fieldName });
        return true;
      }
    }
    
    // If we have a custom regex, use it
    if (this.props.regex) {
      if (!this.props.regex.test(value)) {
        this.showError('Invalid format');
        this.inputEventBus.emit('input.validation.error', { fieldName, message: 'Invalid format' });
        return false;
      } else {
        this.clearError();
        this.inputEventBus.emit('input.validation.success', { fieldName });
        return true;
      }
    }
    
    // If no validation rule, consider it valid
    this.clearError();
    this.inputEventBus.emit('input.validation.success', { fieldName });
    return true;
  }

  // Show error message
  private showError(message: string): void {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return;
    
    this.clearError();
    inputElement.classList.add('field-error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error-message';
    errorElement.textContent = message;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '0.25rem';
    
    inputElement.parentNode?.insertBefore(errorElement, inputElement.nextSibling);
  }

  // Clear error message
  private clearError(): void {
    const inputElement = this.getContent()?.querySelector('input');
    if (!inputElement) return;
    
    inputElement.classList.remove('field-error');
    
    const nextSibling = inputElement.nextSibling as HTMLElement | null;
    if (nextSibling && nextSibling.classList && nextSibling.classList.contains('field-error-message')) {
      nextSibling.remove();
    }
  }

  // Add event listener
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