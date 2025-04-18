import { fixture, html, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { UpdateEmployee } from '../../../src/pages/update-employee';

suite('UpdateEmployee Component', () => {

  test('should render without crashing', async () => {
    const el = await fixture(html`<update-employee></update-employee>`);
    assert.instanceOf(el, customElements.get('update-employee'));
  });

  test('should render <employee-form> inside', async () => {
    const el = await fixture(html`<update-employee></update-employee>`);
    const form = el.shadowRoot.querySelector('employee-form');
    assert.exists(form, '<employee-form> should exist inside update-employee');
  });

  test('should have employeeDetails property passed to employee-form', async () => {
    const mockEmployee = {
      id: 1,
      firstName: 'Ali',
      lastName: 'Veli',
      phone: '1234567890',
      email: 'ali@veli.com',
    };

    const el = await fixture(html`
      <update-employee></update-employee>
    `);

    el._employeeDetails = mockEmployee;
    await el.updateComplete;

    const form = el.shadowRoot.querySelector('employee-form');
    assert.deepEqual(form.employeeDetails, mockEmployee);
  });

});
