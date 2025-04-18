import { fixture, html, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { CreateEmployee } from '../../../src/pages/create-employee';

suite('CreateEmployee Component', () => {

  test('should render without crashing', async () => {
    const el = await fixture(html`<create-employee></create-employee>`);
    assert.instanceOf(el, customElements.get('create-employee'));
  });

  test('should render <employee-form> inside', async () => {
    const el = await fixture(html`<create-employee></create-employee>`);
    const form = el.shadowRoot.querySelector('employee-form');
    assert.exists(form, '<employee-form> should exist inside create-employee');
  });

  test('should update when languageChanged event is dispatched', async () => {
    const el = await fixture(html`<create-employee></create-employee>`);
    const requestUpdateSpy = sinon.spy(el, 'requestUpdate');

    window.dispatchEvent(new CustomEvent('languageChanged'));

    await el.updateComplete;

    assert.isTrue(requestUpdateSpy.called, 'requestUpdate should be called when languageChanged is fired');
  });

});
