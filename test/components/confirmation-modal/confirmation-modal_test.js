import {fixture, assert, html, oneEvent} from '@open-wc/testing';
import { ConfirmationModal } from '../../../src/components/confirmation-modal/confirmation-modal';

suite('confirmation-modal', () => {

  test('is defined', () => {
    const el = document.createElement('confirmation-modal');
    assert.instanceOf(el, customElements.get('confirmation-modal'));
  });

  test('renders nothing when isOpen is false', async () => {
    const el = await fixture(html`
      <confirmation-modal .isOpen=${false}></confirmation-modal>
    `);
    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    assert.isNotOk(overlay)
  });

  test('renders delete modal content when isOpen is true', async () => {
    const el = await fixture(html`
      <confirmation-modal .isOpen=${true} .employeeName=${'John'} .mode=${'delete'}></confirmation-modal>
    `);
    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    const header = el.shadowRoot.querySelector('.modal-header');
    const modalMessage = el.shadowRoot.querySelector('.modal-message');
    assert.ok(overlay);
    assert.ok(header);
    assert.ok(modalMessage);
    assert.include(header.textContent, 'Are you sure');
    assert.include(modalMessage.textContent, 'Selected employee record John will be deleted')
  });

  test('renders update confirmation message', async () => {
    const el = await fixture(html`
      <confirmation-modal .isOpen=${true} .employeeName=${'Jane'} .mode=${'update'}></confirmation-modal>
    `);
    const modalMessage = el.shadowRoot.querySelector('.modal-message');
    assert.ok(modalMessage);
    assert.include(modalMessage.textContent, 'Selected employee record Jane will be updated');
  });

  test('emits "cancel" event when cancel button clicked', async () => {
    const el = await fixture(html`
      <confirmation-modal .isOpen=${true}></confirmation-modal>
    `);
    const cancelBtn = el.shadowRoot.querySelector('button.cancel');
    setTimeout(() => cancelBtn.click());
    const event = await oneEvent(el, 'cancel');
    assert.deepEqual(event.detail, null);
  });

  test('emits "proceed" event when proceed button clicked', async () => {
    const el = await fixture(html`
      <confirmation-modal .isOpen=${true}></confirmation-modal>
    `);
    const proceedBtn = el.shadowRoot.querySelector('button.proceed');
    setTimeout(() => proceedBtn.click());
    const event = await oneEvent(el, 'proceed');
    assert.ok(event);
  });

  test('emits "cancel" when clicking background overlay', async () => {
    const el = await fixture(html`
      <confirmation-modal .isOpen=${true}></confirmation-modal>
    `);
    const overlay = el.shadowRoot.querySelector('.modal-overlay');
    setTimeout(() => overlay.click());
    const event = await oneEvent(el, 'cancel');
    assert.deepEqual(event.detail, null);
  });

});