import './header.css';
import headerHtml from './header.html';

export class Header {
  private headerElement: HTMLElement = document.createElement('header');

  constructor(private app: HTMLElement) {
    this.renderHeader();
  }

  private renderHeader(): void {
    this.headerElement.innerHTML = headerHtml;
    this.app.appendChild(this.headerElement);
  }
}
