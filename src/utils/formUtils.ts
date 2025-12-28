import { setupFormValidation } from './validationUtils';
import { getFormInstances as getAuthorizeFormInstances } from '../pages/forms/authorize';
import { getFormInstances as getRegistrateFormInstances } from '../pages/forms/registrate';
import { getFormInstances as getSettingsFormInstances } from '../pages/forms/settings';
import { getFormInstances as getChatFormInstances } from '../pages/forms/chat';
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
    
    return;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const instances = getChatFormInstances();
    let isValid = true;
    
    Object.values(instances).forEach((input: any) => {
      if (!input.validate()) {
        isValid = false;
      }
    });
    
    if (isValid) {
      const messageInput = instances.message;
      const element = messageInput.getContent()?.querySelector('input') as HTMLInputElement;
      if (element) {
        element.value = '';
        messageInput.clearError();
      }
    }
  });
}

export function attachAuthorizeFormHandler(): void {
  const form = setupFormValidation('authorize-form', ['login', 'password']);
  if (form === null) {
    
    return;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const instances = getAuthorizeFormInstances();
    let isValid = true;
    
    Object.values(instances).forEach((input: any) => {
      if (!input.validate()) {
        isValid = false;
      }
    });
    
    if (isValid) {
      
    }
  });
}

export function attachRegistrateFormHandler(): void {
  const form = setupFormValidation('registrate-form', ['first_name', 'second_name', 'login', 'email', 'password', 'phone']);
  if (form === null) {
    
    return;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const instances = getRegistrateFormInstances();
    let isValid = true;
    
    Object.values(instances).forEach((input: any) => {
      if (!input.validate()) {
        isValid = false;
      }
    });
    
    if (isValid) {
      
    }
  });
}

export function attachSettingsFormHandler(): void {
  const form = setupFormValidation('settings-form', ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone']);
  if (form === null) {
    
    return;
  }
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const instances = getSettingsFormInstances();
    let isValid = true;
    
    Object.values(instances).forEach((input: any) => {
      if (!input.validate()) {
        isValid = false;
      }
    });
    
    if (isValid) {
      
    }
  });
}
