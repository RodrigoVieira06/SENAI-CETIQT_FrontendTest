import { FormController } from './modules/form/form.controller';
import { FooterController } from './shared/components/footer/footer.controller';
import { HeaderController } from './shared/components/header/header.controller';
import './styles.css';

const app = document.getElementById('app');

if (app) {
  new HeaderController(app);
  new FormController(app);
  new FooterController(app);
}
