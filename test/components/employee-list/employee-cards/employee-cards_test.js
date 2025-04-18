import { html, fixture, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { EmployeeCards } from '../../../../src/components/employee-list/employee-cards/employee-cards.js';
import employeeStore from '../../../../src/store/employee-store.js';

suite('employee-cards', () => {

  let employeeStub;

  teardown(() => {
    sinon.restore();
  });

  test('should render correct number of employee-card-item based on paginated employees', async () => {
    const fakeEmployees = [
      { id: 1, name: 'Ali' },
      { id: 2, name: 'Ayşe' },
      { id: 3, name: 'Mehmet' },
    ];

    const fakeSub = {
      subscribe: (cb) => {
        cb({
          filteredEmployees: fakeEmployees,
          currentPage: 1,
          pageSize: 2,
        });
      },
    };

    sinon.stub(employeeStore, 'employee$').value(fakeSub);

    const el = await fixture(html`<employee-cards></employee-cards>`);
    await el.updateComplete;

    const items = el.shadowRoot.querySelectorAll('employee-card-item');
    assert.equal(items.length, 2, 'should render only paged employee items');
  });

  test('should render employee-card-item with correct employee data', async () => {
    const fakeEmployees = [
      { id: 1, name: 'Ali' },
    ];

    sinon.stub(employeeStore, 'employee$').value({
      subscribe: (cb) => {
        cb({
          filteredEmployees: fakeEmployees,
          currentPage: 1,
          pageSize: 5,
        });
      },
    });

    const el = await fixture(html`<employee-cards></employee-cards>`);
    await el.updateComplete;

    const item = el.shadowRoot.querySelector('employee-card-item');
    assert.ok(item, 'employee-card-item should exist');
    assert.deepEqual(item.employee, fakeEmployees[0], 'should pass correct employee object');
  });

  test('should always render pagination component', async () => {
    sinon.stub(employeeStore, 'employee$').value({
      subscribe: (cb) => {
        cb({
          filteredEmployees: [],
          currentPage: 1,
          pageSize: 5,
        });
      },
    });

    const el = await fixture(html`<employee-cards></employee-cards>`);
    const pagination = el.shadowRoot.querySelector('custom-pagination');
    assert.ok(pagination, 'pagination should be rendered');
  });

});
