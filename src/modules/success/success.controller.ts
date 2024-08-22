import './success.css';
import successHtml from './success.html';

export class SuccessController {
  private successElement: HTMLElement = document.createElement('success');

  constructor(private app: HTMLElement) {
    this.renderPage();
  }

  private renderPage(): void {
    this.successElement.innerHTML = successHtml;
    this.app.appendChild(this.successElement);
  }
}
