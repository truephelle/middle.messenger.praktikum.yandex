import EventBus from './eventBus';
import globalEventBus from './globalEventBus';

export const VALIDATION_RULES = {
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

export function validateField(fieldName: string, value: string): string | null {
  const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
  if (!rule) {
    return null;
  }

  if (!rule.pattern.test(value)) {
    return rule.message;
  }

  return null;
}

export function validateForm(formData: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  
  for (const [fieldName, value] of Object.entries(formData)) {
    const error = validateField(fieldName, value);
    if (error) {
      errors[fieldName] = error;
    }
  }
  
  return errors;
}

function clearFieldError(field: HTMLInputElement): void {
  field.classList.remove('field-error');
}

function showFieldError(field: HTMLInputElement, errorMessage: string | null): void {
  clearFieldError(field);
  
  if (errorMessage) {
    field.classList.add('field-error');
    
    const form = field.closest('form');
    const formId = form ? form.id : 'unknown-form';
    
    globalEventBus.emit('form.validation.error', {
      formId: formId,
      fieldName: field.name,
      message: errorMessage
    });
  }
}

export function setupFormValidation(formId: string, fieldNames: string[]): HTMLFormElement | null {
  const eventBus = new EventBus();
  
  eventBus.on('form.validation.error', () => {});
  eventBus.on('form.validation.success', () => {});
  eventBus.on('form.validation.failed', () => {});
  eventBus.on('form.validation.passed', () => {});
  
  globalEventBus.on('form.validation.error', () => {});
  globalEventBus.on('form.validation.success', () => {});
  globalEventBus.on('form.validation.failed', () => {});
  globalEventBus.on('form.validation.passed', () => {});
  
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return null;
  
  fieldNames.forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | null;
    if (field) {
      field.addEventListener('blur', () => {
        const error = validateField(fieldName, field.value);
        if (error) {
          showFieldError(field, error);
          globalEventBus.emit('form.validation.error', { formId, fieldName, message: error });
        } else {
          clearFieldError(field);
          globalEventBus.emit('form.validation.success', { formId, fieldName });
        }
      });
      
      field.addEventListener('input', () => {
        clearFieldError(field);
      });
    }
  });

  form.addEventListener('form.validation.passed', (event: Event) => {
    const formData = new FormData(form);
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
  });

  form.addEventListener('submit', (event) => {
    const formData: Record<string, string> = {};
    fieldNames.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | null;
      if (field) {
        formData[fieldName] = field.value;
      }
    });
    
    const errors = validateForm(formData);
    let hasErrors = false;
    
    fieldNames.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | null;
      if (field && errors[fieldName]) {
        showFieldError(field, errors[fieldName]);
        globalEventBus.emit('form.validation.error', { formId, fieldName, message: errors[fieldName] });
        hasErrors = true;
      } else if (field) {
        clearFieldError(field);
        globalEventBus.emit('form.validation.success', { formId, fieldName });
      }
    });
    
    if (hasErrors) {
      event.preventDefault();
      globalEventBus.emit('form.validation.failed', { formId, errors });
    } else {
      globalEventBus.emit('form.validation.passed', { formId });
    }
  });
  return form;
}
