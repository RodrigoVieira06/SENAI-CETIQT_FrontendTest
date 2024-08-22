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
  }

  public resetForm(): void {
    const form = document.getElementById('registration-form') as HTMLFormElement;
    form.reset();

    this.toaster.show('Formulário foi redefinido.', ToasterEnum.INFO);
    this.updateButtonStates();
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

  private submitForm(): void {
    const isValid = this.validator.validateForm();

    if (isValid) {
      this.toaster.show('Formulário enviado com sucesso!', ToasterEnum.SUCCESS);
      window.history.pushState({}, '', '/success');
      const popStateEvent = new PopStateEvent('popstate');
      dispatchEvent(popStateEvent);
      return;
    }

    this.toaster.show('Por favor, preencha todos os campos obrigatórios.', ToasterEnum.ERROR);
  }

  private updateButtonStates(): void {
    const isValid = this.validator.validateForm();
    const hasData = this.validator.hasData();

    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

    submitButton.disabled = !isValid;
    resetButton.disabled = !hasData;
  }
}
