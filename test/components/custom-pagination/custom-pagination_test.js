import { html, fixture } from '@open-wc/testing';
import { assert } from '@esm-bundle/chai';
import {CustomPagination} from '../../../src/components/custom-pagination/custom-pagination.js';
import store from '../../../src/store/employee-store.js';
import sinon from 'sinon';


suite('CustomPagination', () => {
  let el;

  const mockEmployees = (count) =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`
    }));

  setup(async () => {
    localStorage.clear();

    store.updateStore({
      employees: mockEmployees(10),
      filteredEmployees: mockEmployees(10),
      currentPage: 2,
      pageSize: 2,
      searchQuery: ''
    });

    el = await fixture(html`<custom-pagination></custom-pagination>`);
  });

  test('should render pagination buttons', () => {
    const buttons = el.shadowRoot.querySelectorAll('button');
    assert.isAbove(buttons.length, 0, 'Pagination buttons are rendered');
  });

  test('should highlight current page as active', () => {
    const activeBtn = el.shadowRoot.querySelector('button.active');
    assert.exists(activeBtn, 'Active button exists');
    assert.equal(activeBtn.textContent.trim(), '2', 'Current page is 2');
  });

  test('should call updateStore when page button is clicked', async () => {
    const spy = sinon.spy(store, 'updateStore');

    const el = await fixture(html`<custom-pagination></custom-pagination>`);

    const page3Btn = Array.from(el.shadowRoot.querySelectorAll('button'))
      .find(btn => btn.textContent.trim() === '3');

    page3Btn.click();
    await el.updateComplete;

    assert.isTrue(spy.calledWithMatch({ currentPage: 3 }));

    spy.restore();
  });

  test('should disable previous buttons on first page', async () => {
    store.updateStore({
      ...store.getState(),
      currentPage: 1
    });

    el = await fixture(html`<custom-pagination></custom-pagination>`);
    const buttons = el.shadowRoot.querySelectorAll('button');

    assert.isTrue(buttons[0].disabled, '« is disabled');
    assert.isTrue(buttons[1].disabled, '‹ is disabled');
  });

  test('should disable next buttons on last page', async () => {
    store.updateStore({
      ...store.getState(),
      currentPage: 5
    });

    el = await fixture(html`<custom-pagination></custom-pagination>`);
    const buttons = el.shadowRoot.querySelectorAll('button');
    const last = buttons.length - 1;

    assert.isTrue(buttons[last - 1].disabled, '› is disabled');
    assert.isTrue(buttons[last].disabled, '» is disabled');
  });
});
