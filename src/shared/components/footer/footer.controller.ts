import './footer.css';
import footerHtml from './footer.html';

export class Footer {
  private footerElement: HTMLElement = document.createElement('footer');

  constructor(private app: HTMLElement) {
    this.renderFooter();
  }

  private renderFooter(): void {
    this.footerElement.innerHTML = footerHtml;
    this.app.appendChild(this.footerElement);
  }
}
