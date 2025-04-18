import { fixture, html, assert } from '@open-wc/testing';
import sinon from 'sinon';
import { EmployeeForm } from '../../../src/components/employee-form/employee-form';

suite('employee-form', () => {

  test('should render empty form by default', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    assert.equal(el.firstName, '');
    assert.equal(el.lastName, '');
    assert.ok(el.shadowRoot.querySelector('form'));
  });

  test('should show error when submitting empty form', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    await el.updateComplete;

    assert.isAbove(Object.keys(el.errors).length, 0);
    assert.isAbove(el.shadowRoot.querySelectorAll('.error').length, 0);
  });

  test('should accept valid form input and validate user', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);

    const validateStub = sinon.stub(el, 'validateIfUserExist').callsFake(() => {
      el.isUserAlreadyExist = false;
    });

    el.firstName = 'Seckin';
    el.lastName = 'Yener';
    el.dateOfBirth = '1985-05-10';
    el.dateOfEmployment = '2021-06-01';
    el.phone = '+(90) 555 555 55 55';
    el.email = 'alice@example.com';
    el.department = 'tech';
    el.position = 'lead';

    await el.updateComplete;

    const form = el.shadowRoot.querySelector('form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    assert.isTrue(validateStub.called);
  });

  test('should show email validation error', async () => {
    const el = await fixture(html`<employee-form></employee-form>`);
    el.email = 'invalidEmailTest';

    el.errors = {};
    el.validateEmail(el.errors);

    assert.equal(el.errors.email, 'invalidEmail');
  });

  test('should format phone number correctly', () => {
    const el = new (customElements.get('employee-form'))();
    const result = el.formatPhone('905555555555');

    assert.equal(result, '+(90) 555 555 55 55');
  });

});
