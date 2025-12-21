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

// Validation function
export function validateField(fieldName: string, value: string): string | null {
  const rule = VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES];
  if (!rule) {
    return null; // No validation rule for this field
  }

  if (!rule.pattern.test(value)) {
    return rule.message;
  }

  return null; // No error
}

// Validate all fields in a form
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

// Setup validation for a form
export function setupFormValidation(formId: string, fieldNames: string[]): void {
  queueMicrotask(() => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    if (!form) return;
    
    fieldNames.forEach(fieldName => {
      const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | null;
      if (field) {
        // Add blur validation
        field.addEventListener('blur', () => {
          const error = validateField(fieldName, field.value);
          showFieldError(field, error);
        });
        
        // Clear error when user starts typing
        field.addEventListener('input', () => {
          clearFieldError(field);
        });
      }
    });
    
    // Add submit validation
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
          hasErrors = true;
        } else if (field) {
          clearFieldError(field);
        }
      });
      
      if (hasErrors) {
        event.preventDefault();
      }
    });
  });
}

// Show error for a field
function showFieldError(field: HTMLInputElement, errorMessage: string | null): void {
  clearFieldError(field);
  
  if (errorMessage) {
    field.classList.add('field-error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error-message';
    errorElement.textContent = errorMessage;
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8em';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode?.insertBefore(errorElement, field.nextSibling);
  }
}

// Clear error for a field
function clearFieldError(field: HTMLInputElement): void {
  field.classList.remove('field-error');
  
  const nextSibling = field.nextSibling as HTMLElement | null;
  if (nextSibling && nextSibling.classList && nextSibling.classList.contains('field-error-message')) {
    nextSibling.remove();
  }
}