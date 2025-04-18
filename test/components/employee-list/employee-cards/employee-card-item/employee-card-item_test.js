import { html, fixture, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { EmployeeCardItem } from '../../../../../src/components/employee-list/employee-cards/employee-card-item/employee-card-item.js';
import employeeStore from '../../../../../src/store/employee-store.js';
import { Router } from '@vaadin/router';

suite('EmployeeCardItem', () => {
  const mockEmployee = {
    id: 1,
    firstName: 'Ali',
    lastName: 'Yılmaz',
    dateOfEmployment: '15/01/2022',
    dateOfBirth: '20/05/1990',
    phone: '+(90) 567 568 56 56',
    email: 'ali@example.com',
    department: 'IT',
    position: 'Developer'
  };

  teardown(() => {
    sinon.restore();
  });

  test('should render employee details correctly', async () => {
    const el = await fixture(html`<employee-card-item .employee=${mockEmployee}></employee-card-item>`);
    const textContent = el.shadowRoot.textContent;

    assert.include(textContent, 'Ali');
    assert.include(textContent, 'Yılmaz');
    assert.include(textContent, 'ali@example.com');
    assert.include(textContent, 'Developer');
  });

  test('should open modal with delete mode on delete button click', async () => {
    const el = await fixture(html`<employee-card-item .employee=${mockEmployee}></employee-card-item>`);
    const deleteBtn = el.shadowRoot.querySelector('button.delete');

    deleteBtn.click();
    await el.updateComplete;

    assert.isTrue(el.showConfirmationModal, 'Modal should open');
    assert.equal(el.actionType, 'delete', 'Action type should be delete');
  });

  test('should open modal with edit mode on edit button click', async () => {
    const el = await fixture(html`<employee-card-item .employee=${mockEmployee}></employee-card-item>`);
    const editBtn = el.shadowRoot.querySelector('button.edit');

    editBtn.click();
    await el.updateComplete;

    assert.isTrue(el.showConfirmationModal, 'Modal should open');
    assert.equal(el.actionType, '', 'Action type should be empty string');
  });

  test('should call employeeState.removeEmployee on delete proceed', async () => {
    const removeStub = sinon.stub(employeeStore, 'removeEmployee');
    const el = await fixture(html`<employee-card-item .employee=${mockEmployee}></employee-card-item>`);

    el.actionType = 'delete';
    el.showConfirmationModal = true;
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('confirmation-modal');
    modal.dispatchEvent(new CustomEvent('proceed'));
    await el.updateComplete;

    assert.isTrue(removeStub.calledWith(1), 'removeEmployee should be called with correct ID');
    assert.isFalse(el.showConfirmationModal, 'Modal should close after deletion');
  });

  test('should navigate on edit proceed', async () => {
    const goStub = sinon.stub(Router, 'go');
    const el = await fixture(html`<employee-card-item .employee=${mockEmployee}></employee-card-item>`);

    el.actionType = 'edit';
    el.showConfirmationModal = true;
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('confirmation-modal');
    modal.dispatchEvent(new CustomEvent('proceed'));
    await el.updateComplete;

    assert.isTrue(goStub.calledWith('/update/1'), 'Router.go should be called with correct URL');
    assert.isFalse(el.showConfirmationModal, 'Modal should close after navigation');
  });

  test('should close modal on cancel', async () => {
    const el = await fixture(html`<employee-card-item .employee=${mockEmployee}></employee-card-item>`);
    el.showConfirmationModal = true;
    await el.updateComplete;

    const modal = el.shadowRoot.querySelector('confirmation-modal');
    modal.dispatchEvent(new CustomEvent('cancel'));
    await el.updateComplete;

    assert.isFalse(el.showConfirmationModal, 'Modal should be closed on cancel');
  });

});
