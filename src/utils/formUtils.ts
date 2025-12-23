import { setupFormValidation } from './validationUtils';
import Tooltip from '../components/tooltip/tooltip';
import '../components/tooltip/tooltip.css';

const tooltip = new Tooltip();
(() => tooltip)();

export function attachFormSubmitHandler(_formSelector: string, _handler: (data: Record<string, any>) => void): void {
  setupFormValidation('auth-form', ['login', 'password']);
}

export function attachChatFormHandler(): void {
  const form = setupFormValidation('message-form', ['message']);
  if (form === null) {
    console.log("aww, looks like the auth form is broken");
    return;
  }
  const messageInput = form.querySelector('#message-input') as HTMLInputElement | null;
  if (messageInput) {
    messageInput.value = '';
  }
}

export function attachAuthorizeFormHandler(): void {
  setupFormValidation('authorize-form', ['login', 'password']);
}

export function attachRegistrateFormHandler(): void {
  setupFormValidation('registrate-form', ['first_name', 'second_name', 'login', 'email', 'password', 'phone']);
}

export function attachSettingsFormHandler(): void {
  setupFormValidation('settings-form', ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone']);
}
