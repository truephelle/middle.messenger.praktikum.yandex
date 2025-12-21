import { setupFormValidation } from './validationUtils.ts';

export function attachFormSubmitHandler(formSelector: string, handler: (data: Record<string, any>) => void): void {
  queueMicrotask(() => {
    const form = document.querySelector(formSelector) as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        handler(data);
      });
    }
  });
}

export function attachChatFormHandler(): void {
  // Set up validation for chat form
  setupFormValidation('message-form', ['message']);
  
  queueMicrotask(() => {
    const form = document.querySelector('#message-form') as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        console.log('Chat form data:', data);
        // Clear the input field
        const messageInput = form.querySelector('#message-input') as HTMLInputElement | null;
        if (messageInput) {
          messageInput.value = '';
        }
      });
    }
  });
}

export function attachAuthorizeFormHandler(): void {
  // Set up validation for authorize form
  setupFormValidation('authorize-form', ['login', 'password']);
  
  queueMicrotask(() => {
    const form = document.querySelector('#authorize-form') as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        console.log('Authorize form data:', data);
      });
    }
  });
}

export function attachRegistrateFormHandler(): void {
  // Set up validation for registration form
  setupFormValidation('registrate-form', ['first_name', 'second_name', 'login', 'email', 'password', 'phone']);
  
  queueMicrotask(() => {
    const form = document.querySelector('#registrate-form') as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        console.log('Registrate form data:', data);
      });
    }
  });
}

export function attachSettingsFormHandler(): void {
  // Set up validation for settings form
  setupFormValidation('settings-form', ['first_name', 'second_name', 'display_name', 'login', 'email', 'phone']);
  
  queueMicrotask(() => {
    const form = document.querySelector('#settings-form') as HTMLFormElement | null;
    if (form) {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const data: Record<string, any> = {};
        formData.forEach((value, key) => {
          data[key] = value;
        });
        console.log('Settings form data:', data);
      });
    }
  });
}