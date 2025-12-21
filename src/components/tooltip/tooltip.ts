import EventBus from '../../utils/eventBus';
import globalEventBus from '../../utils/globalEventBus';

class Tooltip {
    name = 'tooltip';
    indent = 5;
    el: HTMLDivElement;

    constructor() {
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.classList.add(this.name);

        document.body.appendChild(this.el);

        // Subscribe to validation error events from global event bus
        this.subscribeToValidationEvents();
    }

    private subscribeToValidationEvents(): void {
        // Register listeners to prevent errors
        globalEventBus.on('input.validation.error', () => {});
        globalEventBus.on('input.validation.success', () => {});
        globalEventBus.on('form.validation.error', () => {});
        globalEventBus.on('form.validation.success', () => {});
        globalEventBus.on('form.validation.failed', () => {});
        globalEventBus.on('form.validation.passed', () => {});
        globalEventBus.on('input.focus', () => {});

        // Listen for input validation errors
        globalEventBus.on('input.validation.error', (data: { fieldName: string, message: string }) => {
            this.onInputError(data.fieldName, data.message);
        });

        // Listen for input validation success (to hide tooltip)
        globalEventBus.on('input.validation.success', (data: { fieldName: string }) => {
            // Hide tooltip for this field if it's currently shown
            this.onHide();
        });

        // Listen for form submission errors
        globalEventBus.on('form.validation.error', (data: { formId: string, fieldName: string, message: string }) => {
            this.onFormError(data.formId, data.fieldName, data.message);
        });

        // Listen for form validation success (to hide tooltip)
        globalEventBus.on('form.validation.success', (data: { formId: string, fieldName: string }) => {
            // Hide tooltip for this field if it's currently shown
            this.onHide();
        });

        // Listen for input focus to hide tooltip
        globalEventBus.on('input.focus', (element: HTMLInputElement) => {
            this.onHide();
        });
    }

    private onInputError(fieldName: string, message: string): void {
        const inputElement = document.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement | null;
        if (inputElement) {
            this.onShow(inputElement, message);
        }
    }

    private onFormError(formId: string, fieldName: string, message: string): void {
        // For form errors, we'll show tooltip on the first erroneous input
        const form = document.getElementById(formId) as HTMLFormElement | null;
        if (form) {
            const inputElement = form.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement | null;
            if (inputElement) {
                this.onShow(inputElement, message);
            }
        }
    }

    onShow(element: HTMLInputElement, message: string): void {
        // Set the tooltip content
        this.el.innerHTML = message;

        // Add the active class to display the tooltip
        this.el.classList.add(`${this.name}_active`);

        const sourceElRect = element.getBoundingClientRect();
        const elRect = this.el.getBoundingClientRect();

        let top = sourceElRect.bottom + this.indent;
        const left = sourceElRect.left;

        // If tooltip doesn't fit below, show it above
        if (top + elRect.height > document.documentElement.clientHeight) {
            top = sourceElRect.top - elRect.height - this.indent;
        }

        this.el.style.top = `${top + window.scrollY}px`;
        this.el.style.left = `${left + window.scrollX}px`;
    }

    onHide(): void {
        this.el.classList.remove(`${this.name}_active`);
    }

    // Method to manually show tooltip on an element
    show(element: HTMLElement, message: string): void {
        if (element instanceof HTMLInputElement) {
            this.onShow(element, message);
        }
    }

    // Method to manually hide tooltip
    hide(): void {
        this.onHide();
    }

}

export default Tooltip;