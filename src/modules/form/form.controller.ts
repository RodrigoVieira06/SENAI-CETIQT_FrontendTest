import './form.css';
import { FormFacade } from './form.facade';
import formHtml from './form.html';

export class FormController {
  private formElement: HTMLElement = document.createElement('registration-form');
  private formFacade: FormFacade;

  constructor(private app: HTMLElement) {
    this.renderPage();
    this.addListeners();

    this.formFacade = new FormFacade();
  }

  public addListeners(): void {
    const phoneInput = document.getElementById('phone') as HTMLInputElement;

    document.getElementById('submit-button')?.addEventListener('click', () => {
      this.formFacade.submitForm();
    });

    document.getElementById('reset-button')?.addEventListener('click', () => {
      this.formFacade.resetForm();
    });

    phoneInput.addEventListener('input', this.applyPhoneMask);
  }

  private renderPage(): void {
    this.formElement.innerHTML = formHtml;
    this.app.appendChild(this.formElement);
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
}
