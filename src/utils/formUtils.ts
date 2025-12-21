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
  attachFormSubmitHandler('#message-form', (data) => {
    console.log('Chat form data:', data);
    // Clear the input field
    const form = document.querySelector('#message-form') as HTMLFormElement | null;
    if (form) {
      const messageInput = form.querySelector('#message-input') as HTMLInputElement | null;
      if (messageInput) {
        messageInput.value = '';
      }
    }
  });
}

export function attachAuthorizeFormHandler(): void {
  attachFormSubmitHandler('#authorize-form', (data) => {
    console.log('Authorize form data:', data);
  });
}

export function attachRegistrateFormHandler(): void {
  attachFormSubmitHandler('#registrate-form', (data) => {
    console.log('Registrate form data:', data);
  });
}

export function attachSettingsFormHandler(): void {
  attachFormSubmitHandler('#settings-form', (data) => {
    console.log('Settings form data:', data);
  });
}