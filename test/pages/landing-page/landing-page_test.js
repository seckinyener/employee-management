import { fixture, html, assert } from '@open-wc/testing';
import { LandingPage } from '../../../src/pages/landing-page';

suite('landing-page', () => {
  
  test('should render successfully', async () => {
    const el = await fixture(html`<landing-page></landing-page>`);
    assert.instanceOf(el, customElements.get('landing-page'));
  });

  test('should contain employee-list element', async () => {
    const el = await fixture(html`<landing-page></landing-page>`);
    const employeeList = el.shadowRoot.querySelector('employee-list');
    assert.exists(employeeList);
  });

});
