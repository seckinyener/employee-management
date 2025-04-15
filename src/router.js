import { Router } from '@vaadin/router';

import './components/layout.js';
import './pages/create-employee.js';
import './pages/update-employee.js';
import './pages/landing-page.js';

const outlet = document.getElementById('app');
const router = new Router(outlet);

router.setRoutes([
  {
    path: '/',
    component: 'layout-component',
    children: [
      { path: '', component: 'landing-page' },
      { path: 'create', component: 'create-employee' },
      { path: 'update/:id', component: 'update-employee' },
    ]
  },
]);

export default router;

