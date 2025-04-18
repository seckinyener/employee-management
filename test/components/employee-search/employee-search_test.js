import { html, fixture, assert, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';
import store from '../../../src/store/employee-store.js';
import { EmployeeSearch } from '../../../src/components/employee-search/employee-search.js';

function mockEmployees() {
  return [
    { id: 1, name: 'Seckin Yener', department: 'IT' },
    { id: 2, name: 'Bob Smith', department: 'Finance' },
  ];
}

suite('employee-search', () => {
  let updateStub;

  setup(() => {
    store.updateStore({
      employees: mockEmployees(),
      filteredEmployees: mockEmployees(),
      currentPage: 1,
      pageSize: 2,
      searchQuery: ''
    });
  });

  teardown(() => {
    if (updateStub) updateStub.restore();
  });

  test('should filter and update store when user types', async () => {
    const el = await fixture(html`<employee-search></employee-search>`);
    const input = el.shadowRoot.querySelector('input');

    updateStub = sinon.stub(store, 'updateStore');

    input.value = 'seckin';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    await new Promise(resolve => setTimeout(resolve, 350));

    assert.isTrue(updateStub.calledOnce);
    const callArg = updateStub.firstCall.args[0];

    assert.equal(callArg.searchQuery, 'seckin');
    assert.equal(callArg.currentPage, 1);
    assert.deepEqual(callArg.filteredEmployees, [mockEmployees()[0]]);
  });
});
