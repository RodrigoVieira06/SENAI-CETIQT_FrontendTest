// src/components/FormValidator.ts

import { FormData } from '../models/FormData';

export class FormValidator {
  public validateForm(): boolean {
    const formData = this.getFormData();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.birthDate ||
      !this.validateEmail(formData.email) ||
      !this.validatePhone(formData.phone) ||
      formData.interests.length === 0
    ) {
      return false;
    }

    return true;
  }

  public hasData(): boolean {
    const formData = this.getFormData();

    if (
      !formData.fullName &&
      !formData.email &&
      !formData.birthDate &&
      !formData.email &&
      !formData.phone &&
      formData.interests.length === 0
    ) {
      return false;
    }

    return true;
  }

  private getFormData(): FormData {
    return {
      fullName: (document.getElementById('fullName') as HTMLInputElement)?.value,
      email: (document.getElementById('email') as HTMLInputElement)?.value,
      birthDate: (document.getElementById('birthDate') as HTMLInputElement)?.value,
      gender: (document.getElementById('gender') as HTMLSelectElement)?.value,
      phone: (document.getElementById('phone') as HTMLInputElement)?.value,
      interests: Array.from(document.querySelectorAll('input[name="interests"]:checked')).map(
        (el) => (el as HTMLInputElement).value
      ),
    };
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    return phoneRegex.test(phone);
  }
}
