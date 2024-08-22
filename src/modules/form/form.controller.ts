import './form.css';
import { FormFacade } from './form.facade';
import formHtml from './form.html';

export class FormController {
  private formElement: HTMLElement = document.createElement('registration-form');
  private formFacade = new FormFacade();

  constructor(private app: HTMLElement) {
    this.renderPage();
    this.addListeners();

  }

  public addListeners(): void {
    document.getElementById('submit-button')?.addEventListener('click', () => {
      this.formFacade.submitForm();
    });

    document.getElementById('reset-button')?.addEventListener('click', () => {
      this.formFacade.resetForm();
    });
  }

  private renderPage(): void {
    this.formElement.innerHTML = formHtml;
    this.app.appendChild(this.formElement);
  }
}
