import { html, fixture, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { BehaviorSubject } from 'rxjs';
import { EmployeeTable } from '../../../../src/components/employee-list/employee-table/employee-table';
import employeeState from '../../../../src/store/employee-store.js';

suite('EmployeeTable Component', () => {
  let employeeSubject;
  let unsubscribeStub;

  setup(() => {
    employeeSubject = new BehaviorSubject({
      filteredEmployees: [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' }
      ],
      currentPage: 1,
      pageSize: 10
    });

    employeeState.employee$ = employeeSubject;

    employeeState.getAllEmployees = () => employeeSubject.value.filteredEmployees;
    employeeState.removeEmployee = sinon.stub();

    unsubscribeStub = sinon.stub(employeeSubject, 'unsubscribe');
  });

  test('should render with employees from store', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    await el.updateComplete;

    assert.equal(el.employeesInPage.length, 2);
    assert.equal(el.shadowRoot.querySelectorAll('tbody tr').length, 2);
  });

  test('should select all employees', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    await el.updateComplete;

    const selectAllCheckbox = el.shadowRoot.querySelector('thead input[type="checkbox"]');
    selectAllCheckbox.checked = true;
    selectAllCheckbox.dispatchEvent(new Event('change'));

    await el.updateComplete;

    assert.equal(el.selectedEmployees.size, 2);
    assert.isTrue(el.selectedEmployees.has(1));
    assert.isTrue(el.selectedEmployees.has(2));
  });

  test('should deselect all employees', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    await el.updateComplete;

    el.selectAllHandler({ target: { checked: true } });

    el.selectAllHandler({ target: { checked: false } });
    await el.updateComplete;

    assert.equal(el.selectedEmployees.size, 0);
  });

  test('should select/deselect a row when clicked', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    await el.updateComplete;

    el.selectRowHandler(1);
    assert.isTrue(el.selectedEmployees.has(1));

    el.selectRowHandler(1);
    assert.isFalse(el.selectedEmployees.has(1));
  });

  test('should open modal on deleteHandler', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    await el.updateComplete;

    const employee = { id: 1, firstName: 'John', lastName: 'Doe' };
    el.deleteHandler(employee);
    await el.updateComplete;

    assert.deepEqual(el.toBeDeletedEmployee, employee);
    assert.equal(el.actionType, 'delete');
    assert.isTrue(el.showConfirmationModal);
  });

  test('should remove employee on deleteProceedHandler', async () => {
    const el = await fixture(html`<employee-table></employee-table>`);
    await el.updateComplete;

    const employee = { id: 1, firstName: 'John', lastName: 'Doe' };
    el.toBeDeletedEmployee = employee;
    el.showConfirmationModal = true;

    el.deleteProceedHandler();

    assert.isTrue(employeeState.removeEmployee.calledOnceWith(1));
    assert.isFalse(el.showConfirmationModal);
    assert.deepEqual(el.toBeDeletedEmployee, {});
  });
});
