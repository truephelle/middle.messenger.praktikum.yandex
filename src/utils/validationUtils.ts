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

export function setupFormValidation(formId: string, fieldNames: string[]): HTMLFormElement | null {
  const eventBus = new EventBus();
  
  const form = document.getElementById(formId) as HTMLFormElement | null;
  if (!form) return null;
  
  fieldNames.forEach(fieldName => {
    const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | null;
    if (field) {
      field.addEventListener('blur', () => {
        const error = validateField(fieldName, field.value);
        if (error) {
          globalEventBus.emit('form.validation.error', { formId, fieldName, message: error });
        } else {
          globalEventBus.emit('form.validation.success', { formId, fieldName });
        }
      });
    }
  });

  globalEventBus.on('form.validation.passed', (data: { formId: string }) => {
    if (data.formId === formId) {
      const formData = new FormData(form);
      const dataObj: Record<string, any> = {};
      formData.forEach((value, key) => {
        dataObj[key] = value;
      });
      console.log('Form validation passed with data:', dataObj);
    }
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
    let firstErrorField: HTMLInputElement | null = null;
    
    fieldNames.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | null;
      if (field && errors[fieldName]) {
        globalEventBus.emit('form.validation.error', { formId, fieldName, message: errors[fieldName] });
        hasErrors = true;
        if (!firstErrorField) {
          firstErrorField = field;
        }
      } else if (field) {
        globalEventBus.emit('form.validation.success', { formId, fieldName });
      }
    });
    
    if (firstErrorField) {
      (firstErrorField as HTMLInputElement).focus();
    }
    
    if (hasErrors) {
      event.preventDefault();
      globalEventBus.emit('form.validation.failed', { formId, errors });
    } else {
      event.preventDefault();
      globalEventBus.emit('form.validation.passed', { formId });
    }
  });
  return form;
}
