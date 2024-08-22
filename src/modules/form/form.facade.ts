// src/components/FormFacade.ts

import { ToasterEnum } from "../../shared/enums/toaster";
import { ToasterService } from "../../shared/services/toaster.service";
import { DOMManipulator } from "./services/DOMManipulator.service";
import { FormValidator } from "./services/validation.service";

export class FormFacade {
  private validator: FormValidator;
  private domManipulator: DOMManipulator;
  private toaster: ToasterService;

  constructor() {
    this.validator = new FormValidator();
    this.domManipulator = new DOMManipulator();
    this.toaster = new ToasterService();

    this.addInputListeners();
    this.updateButtonStates();
  }

  public submitForm(): void {
    const isValid = this.validator.validateForm();

    if (isValid) {
      this.toaster.show('Formulário enviado com sucesso!', ToasterEnum.SUCCESS);
      this.domManipulator.resetForm();
      this.updateButtonStates();
      return;
    }

    this.toaster.show('Por favor, preencha todos os campos obrigatórios.', ToasterEnum.ERROR);
  }

  public resetForm(): void {
    this.domManipulator.resetForm();
    this.toaster.show('Formulário foi redefinido.', ToasterEnum.INFO);
    this.updateButtonStates();
  }

  private addInputListeners(): void {
    const inputs = document.querySelectorAll('#registration-form input, #registration-form select');
    inputs.forEach((input) => {
      input.addEventListener('input', () => this.updateButtonStates());
    });
  }

  private updateButtonStates(): void {
    const isValid = this.validator.validateForm();
    const hasData = this.domManipulator.hasData();

    const submitButton = document.getElementById('submit-button') as HTMLButtonElement;
    const resetButton = document.getElementById('reset-button') as HTMLButtonElement;

    submitButton.disabled = !isValid;
    resetButton.disabled = !hasData;
  }
}
