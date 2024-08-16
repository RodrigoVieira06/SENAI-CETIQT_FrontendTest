import { FormController } from './modules/form/form.controller';
import { Footer } from './shared/components/footer/footer.controller';
import { Header } from './shared/components/header/header.controller';
import './styles.css';

const app = document.getElementById('app');
if (app) {
  new Header(app);
  new FormController(app);
  new Footer(app);
}