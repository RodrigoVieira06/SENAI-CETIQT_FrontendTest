import './form.css';
import formHtml from './form.html';
// import { validateForm } from '../validation/validation.service';
// import { ToasterService } from '../toaster/toaster.service';

export class FormController {
  private formElement: HTMLElement = document.createElement('form');

  constructor(private app: HTMLElement) {
    this.renderForm();
    // this.attachListeners();
  }

  private renderForm(): void {
    this.formElement.innerHTML = formHtml;
    this.app.appendChild(this.formElement);
  }

  // private attachListeners() {
  //   if (this.form) {
  //     this.form.addEventListener('submit', (event) => {
  //       event.preventDefault();
  //       if (validateForm(this.form)) {
  //         ToasterService.getInstance().showMessage('Formulário enviado com sucesso!');
  //       }
  //     });
  //   }
  // }
}
