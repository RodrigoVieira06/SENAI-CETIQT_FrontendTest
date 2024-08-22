// src/components/DOMManipulator.ts

export class DOMManipulator {
  public resetForm(): void {
    const form = document.getElementById('registration-form') as HTMLFormElement;
    form.reset();
  }

  public hasData(): boolean {
    const inputs = document.querySelectorAll('#registration-form input, #registration-form select');
    return Array.from(inputs).some((input) => (input as HTMLInputElement).value.trim() !== '');
  }
}
