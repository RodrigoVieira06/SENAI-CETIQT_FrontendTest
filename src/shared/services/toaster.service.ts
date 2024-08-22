import { ToasterEnum } from "../enums/toaster";

export class ToasterService {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'toaster-container';
    this.container.style.position = 'fixed';
    this.container.style.top = '20px';
    this.container.style.right = '40px';
    this.container.style.zIndex = '9999';
    document.body.appendChild(this.container);
  }

  private createToast(message: string, type: ToasterEnum): HTMLElement {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    toast.style.padding = '10px 20px';
    toast.style.marginBottom = '10px';
    toast.style.borderRadius = '5px';
    toast.style.color = '#fff';
    toast.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    toast.style.opacity = '0.9';

    switch (type) {
      case ToasterEnum.SUCCESS:
        toast.style.backgroundColor = '#4CAF50';
        break;
      case ToasterEnum.ERROR:
        toast.style.backgroundColor = '#F44336';
        break;
      case ToasterEnum.INFO:
        toast.style.backgroundColor = '#2196F3';
        break;
      case ToasterEnum.WARNING:
        toast.style.backgroundColor = '#FF9800';
        break;
    }

    return toast;
  }

  public show(message: string, type: ToasterEnum = ToasterEnum.INFO, duration: number = 3000): void {
    const toast = this.createToast(message, type);
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        this.container.removeChild(toast);
      }, 600);
    }, duration);
  }
}
