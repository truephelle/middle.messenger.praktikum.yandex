import globalEventBus from '../../utils/globalEventBus';
import './tooltip.css';

class Tooltip {
    name = 'tooltip';
    indent = 5;
    el: HTMLDivElement;

    constructor() {
        this.el = document.createElement('div');
        this.el.style.position = 'absolute';
        this.el.classList.add(this.name);

        document.body.appendChild(this.el);

        this.subscribeToValidationEvents();
    }

    private subscribeToValidationEvents(): void {
        globalEventBus.on('input.validation.error', () => {});
        globalEventBus.on('input.validation.success', () => {});
        globalEventBus.on('form.validation.error', () => {});
        globalEventBus.on('form.validation.success', () => {});
        globalEventBus.on('form.validation.failed', () => {});
        globalEventBus.on('form.validation.passed', () => {});
        globalEventBus.on('input.focus', () => {});

        globalEventBus.on('input.validation.error', (data: { fieldName: string, message: string }) => {
            this.onInputError(data.fieldName, data.message);
        });

        globalEventBus.on('input.validation.success', (data: { fieldName: string }) => {
            this.onHide();
        });

        globalEventBus.on('form.validation.error', (data: { formId: string, fieldName: string, message: string }) => {
            this.onFormError(data.formId, data.fieldName, data.message);
        });

        globalEventBus.on('form.validation.success', (data: { formId: string, fieldName: string }) => {
            this.onHide();
        });

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
        const form = document.getElementById(formId) as HTMLFormElement | null;
        if (form) {
            const inputElement = form.querySelector(`input[name="${fieldName}"]`) as HTMLInputElement | null;
            if (inputElement) {
                this.onShow(inputElement, message);
            }
        }
    }

    onShow(element: HTMLInputElement, message: string): void {
        this.el.innerHTML = message;

        this.el.classList.add(`${this.name}_active`);

        const sourceElRect = element.getBoundingClientRect();
        const elRect = this.el.getBoundingClientRect();

        let top = sourceElRect.bottom + this.indent;
        const left = sourceElRect.left;

        if (top + elRect.height > document.documentElement.clientHeight) {
            top = sourceElRect.top - elRect.height - this.indent;
        }

        this.el.style.top = `${top + window.scrollY}px`;
        this.el.style.left = `${left + window.scrollX}px`;
    }

    onHide(): void {
        this.el.classList.remove(`${this.name}_active`);
    }

    show(element: HTMLElement, message: string): void {
        if (element instanceof HTMLInputElement) {
            this.onShow(element, message);
        }
    }

    hide(): void {
        this.onHide();
    }

}

export default Tooltip;
