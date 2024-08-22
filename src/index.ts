import { FormController } from './modules/form/form.controller';
import { SuccessController } from './modules/success/success.controller';
import { Router } from './router';
import { FooterController } from './shared/components/footer/footer.controller';
import { HeaderController } from './shared/components/header/header.controller';
import './styles.css';

const app = document.getElementById('app');

if (app) {
  const router = new Router();

  new HeaderController(app);

  router.add('/', () => {
    new FormController(app);
  });

  router.add('/success', () => {
    new SuccessController(app);
  });

  router.handleLocation();

  new FooterController(app);
}
