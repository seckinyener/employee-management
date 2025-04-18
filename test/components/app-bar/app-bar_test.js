import {fixture, assert, html} from '@open-wc/testing';
import { AppBar } from '../../../src/components/app-bar/app-bar.js';

suite('app-bar', () => {
  test('is defined', () => {
    const el = document.createElement('app-bar');
    assert.instanceOf(el, customElements.get('app-bar'));
  });

  test('renders logo and action items', async () => {
    const el = await fixture(html`<app-bar></app-bar>`);
    const img = el.shadowRoot.querySelector('img');
    const navButtons = el.shadowRoot.querySelectorAll('.layout-banner-action-item');
    assert.ok(img);
    assert.equal(navButtons.length, 2);
  });

  test('changes language when flag clicked', async () => {
    const el = await fixture(html`<app-bar></app-bar>`);
    const trButton = el.shadowRoot.querySelector('span img[src="/assets/tr.png"]').parentElement;
    trButton.click();
    await el.updateComplete;
    assert.equal(el.selectedLang, 'tr');
  });

  test('highlights active route', async () => {
    const el = await fixture(html`<app-bar></app-bar>`);
    el.currentRoute = '/create';
    await el.updateComplete;
    const createBtn = el.shadowRoot.querySelector('.layout-banner-action-item:nth-child(2)');
    assert.isTrue(createBtn.classList.contains('active'));
  });
});