import { html, fixture, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { EmployeeList } from '../../../src/components/employee-list/employee-list.js';

import sessionStore from '../../../src/store/session.store.js';
import employeeStore from '../../../src/store/employee-store.js';
import { VIEW_MODE_CARD, VIEW_MODE_TABLE } from '../../../src/utils/constants.js';
import { t } from '../../../src/i18n.js'

suite('employee-list', () => {

  let sessionStub;
  let employeeStub;

  setup(() => {
    sessionStub = sinon.stub(sessionStore, 'session$').value({
      subscribe: (cb) => cb({ viewMode: VIEW_MODE_TABLE })
    });

    employeeStub = sinon.stub(employeeStore, 'employee$').value({
      subscribe: (cb) =>
        cb({
          employees: [],
          filteredEmployees: [],
        }),
    });
  });

  teardown(() => {
    sinon.restore();
  });

  test('should render with default selectedView as table', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    assert.equal(el.selectedView, VIEW_MODE_TABLE);
  });

  test('should react to employee store updates', async () => {
    let storeCallback;
    const fakeSub = {
      subscribe: (cb) => {
        storeCallback = cb;
        cb({ employees: [], filteredEmployees: [] });
      },
    };
    sinon.stub(employeeStore, 'employee$').value(fakeSub);

    const el = await fixture(html`<employee-list></employee-list>`);
    assert.isFalse(el.hasAnyEmployee);
    assert.isFalse(el.hasAnyFilteredEmployee);

    storeCallback({ employees: [{}], filteredEmployees: [{}] });
    await el.updateComplete;

    assert.isTrue(el.hasAnyEmployee);
    assert.isTrue(el.hasAnyFilteredEmployee);
  });

  test('should update view when clicking icons', async () => {
    const updateSpy = sinon.spy(sessionStore, 'updateViewMode');

    const el = await fixture(html`<employee-list></employee-list>`);
    const icons = el.shadowRoot.querySelectorAll('.material-icons');

    icons[1].click();
    assert.isTrue(updateSpy.calledWith(VIEW_MODE_CARD));

    icons[0].click();
    assert.isTrue(updateSpy.calledWith(VIEW_MODE_TABLE));
  });

  test('should show noRecords when no employees', async () => {
    const el = await fixture(html`<employee-list></employee-list>`);
    const warning = el.shadowRoot.querySelector('.no-records-warning');

    assert.include(warning.textContent, t('noRecords'));
  });

  test('should show noRecordsAfterSearch when filtered is empty', async () => {
    sinon.stub(employeeStore, 'employee$').value({
      subscribe: (cb) => cb({
        employees: [{}],
        filteredEmployees: [],
      }),
    });

    const el = await fixture(html`<employee-list></employee-list>`);
    const warning = el.shadowRoot.querySelector('.no-records-warning');

    assert.include(warning.textContent, t('noRecordsAfterSearch'));
  });

  test('should render employee-table when view is table', async () => {
    sinon.stub(employeeStore, 'employee$').value({
      subscribe: (cb) => cb({
        employees: [{}],
        filteredEmployees: [{}],
      }),
    });

    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;

    const table = el.shadowRoot.querySelector('employee-table');
    assert.ok(table);
  });

  test('should render employee-cards when view is card', async () => {
    sinon.stub(sessionStore, 'session$').value({
      subscribe: (cb) => cb({ viewMode: VIEW_MODE_CARD }),
    });

    sinon.stub(employeeStore, 'employee$').value({
      subscribe: (cb) => cb({
        employees: [{}],
        filteredEmployees: [{}],
      }),
    });

    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;

    const cards = el.shadowRoot.querySelector('employee-cards');
    assert.ok(cards);
  });

});
