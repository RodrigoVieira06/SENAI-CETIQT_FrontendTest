import { ToasterEnum } from '../../shared/enums/toaster';
import { ToasterService } from '../../shared/services/toaster.service';
import './form.css';
import formHtml from './form.html';
import { FormValidator } from './services/validation.service';

export class FormController {
  private formElement: HTMLElement = document.createElement('registration-form');
  private validator: FormValidator;
  private toaster: ToasterService;

  constructor(private app: HTMLElement) {
    this.validator = new FormValidator();
    this.toaster = new ToasterService();

    this.renderPage();
    this.addListeners();
    this.updateButtonStates();
  }

  private renderPage(): void {
    this.formElement.innerHTML = formHtml;
    this.app.appendChild(this.formElement);
  }

  public addListeners(): void {
    const form = document.getElementById('registration-form') as HTMLFormElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;

    const inputs = document.querySelectorAll('#registration-form input, #registration-form select');
    inputs.forEach((input) => {
      input.addEventListener('input', () => this.updateButtonStates());
    });

    document.getElementById('submit-button')?.addEventListener('click', () => {
      this.submitForm();
    });

    document.getElementById('reset-button')?.addEventListener('click', () => {
      this.resetForm();
    });

    phoneInput.addEventListener('input', this.applyPhoneMask);

    this.attachFieldValidation(form);
  }

  public resetForm(): void {
    this.clearErrors();
    const form = document.getElementById('registration-form') as HTMLFormElement;
    form.reset();

    this.toaster.show('Formulário foi redefinido.', ToasterEnum.INFO);
    this.updateButtonStates();
  }

  private submitForm(): void {
    this.clearErrors();
    const isValid = this.validator.validateForm();

    if (isValid) {
      this.toaster.show('Formulário enviado com sucesso!', ToasterEnum.SUCCESS);
      this.resetForm();
      return;
    }

    this.toaster.show('Por favor, preencha todos os campos obrigatórios.', ToasterEnum.ERROR);
  }

  private applyPhoneMask(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    const formattedValue = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    input.value = formattedValue;
  }

  private updateButtonStates(): void {
    const isValid = this.validator.validateForm();
    const hasData = this.validator.hasData();

    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

    submitButton.disabled = !isValid;
    resetButton.disabled = !hasData;
  }

  private attachFieldValidation(form: HTMLFormElement): void {
    Array.from(form.elements).forEach((element: any) => {
      if (element instanceof HTMLInputElement || element instanceof HTMLSelectElement) {
        element.addEventListener('input', () => {
          this.clearErrorsForElement(element);
          if (!element.validity.valid) {
            this.displayErrors({
              [element.id]: this.getErrorMessage(element),
            });
          }
        });

        element.addEventListener('blur', () => {
          this.clearErrorsForElement(element);
          if (!element.validity.valid) {
            this.displayErrors({
              [element.id]: this.getErrorMessage(element),
            });
          }
        });
      }
    });
  }

  private clearErrors(): void {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((msg) => msg.remove());
  }

  private clearErrorsForElement(element: HTMLElement): void {
    const errorElement = element.parentElement?.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  private displayErrors(errors: { [key: string]: string }): void {
    Object.keys(errors).forEach((key) => {
      const inputElement = document.getElementById(key) as HTMLInputElement;
      const errorMessageElement = document.createElement('div');
      errorMessageElement.className = 'error-message';
      errorMessageElement.innerText = errors[key];
      inputElement.parentElement?.appendChild(errorMessageElement);
    });
  }

  public getErrorMessage(element: HTMLInputElement | HTMLSelectElement): string {
    if (element.validity.valueMissing) {
      return 'Este campo é obrigatório.';
    }

    if (element.validity.typeMismatch && element.type === 'email') {
      return 'Por favor, insira um e-mail válido.';
    }

    if (element.validity.patternMismatch && element.type === 'tel') {
      return 'Por favor, insira um telefone no formato (99) 99999-9999.';
    }

    return 'Valor inválido.';
  }
}
