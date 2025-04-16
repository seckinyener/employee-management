import { css, html, LitElement } from "lit";
import { Router } from "@vaadin/router";
import { addEmployee, updateEmployee } from "../../store/employee-store";
import { t } from "../../i18n";

export class EmployeeForm extends LitElement{

    static properties = {
        employeeDetails: {type: Object},
        firstName: {state: true, type: String, value: ''},
        lastName: {state: true, type: String},
        dateOfBirth: {state: true, type: String},
        dateOfEmployment: {state: true, type: String},
        phone: {state: true, type: String},
        email: {state: true, type: String},
        department: {state: true, type: String},
        position: {state: true, type: String},
        errors: { state: true, type: Object}
    }

    constructor() {
        super();
        this.firstName = '';
        this.lastName = '';
        this.dateOfBirth = '';
        this.dateOfEmployment = '';
        this.phone = '';
        this.email = '';
        this.department = '';
        this.position = '';
        this.errors = {};
    }

    connectedCallback() {
        super.connectedCallback();
        if(this.employeeDetails) {
            this.firstName = this.employeeDetails.firstName;
            this.lastName = this.employeeDetails.lastName;
            this.dateOfBirth = this.employeeDetails.dateOfBirth;
            this.dateOfEmployment = this.employeeDetails.dateOfEmployment;
            this.phone = this.employeeDetails.phone;
            this.email = this.employeeDetails.email;
            this.department = this.employeeDetails.department;
            this.position = this.employeeDetails.position;
        }
    }

    validateFirstName = (errors) => {
        if(!this.firstName) {
            errors['firstName'] = 'First name is required';
        }
    }

    validateLastName = (errors) => {
        if(!this.lastName) {
            errors['lastName'] = 'Last name is required';
        }
    }

    validateDateOfBirth = (errors) => {
        if (!this.dateOfBirth) {
            errors['dateOfBirth']= "Date of birth is required";
        } 
    }

    validateDateOfEmployment = (errors) => {
        if (!this.dateOfEmployment) {
            errors['dateOfEmployment']= "Date of employment is required";
        } 
    }

    validatePhone = (errors) => {
        if(!this.phone) {
            errors['phone'] = "Phone is required";
        } else if(!/^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4})$/.test(this.phone)) {
            errors['phone'] = "Phone number is not in correct format"
        }
    }

    validateEmail = (errors) => {
        if(!this.email) {
            errors['email'] = "Email is required";
        } else if(!/\S+@\S+\.\S+/.test(this.email)) {
            errors['email'] = "Invalid email address.."
        }
    }

    validateDepartment = (errors) => {
        if (!this.department) {
            errors['department'] = "Department is required";
        }
    }

    validatePosition = (errors) => {
        if(!this.position) {
            errors['position'] = "Position is required"
        }
    }

    validateForm = () => {
        const errors = {};
        this.validateFirstName(errors);
        this.validateLastName(errors);
        this.validateDateOfBirth(errors);
        this.validateDateOfEmployment(errors);
        this.validatePhone(errors);
        this.validateEmail(errors);
        this.validateDepartment(errors);
        this.validatePosition(errors);
        this.errors = errors;
        return Object.keys(this.errors).length === 0;
    }

    handleCancel = () => {
        Router.go("/");
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm()) {
            const emp  = {
                id: this.employeeDetails?.id ?? Date.now(),
                firstName: this.firstName,
                lastName: this.lastName,
                dateOfBirth: this.dateOfBirth,
                dateOfEmployment: this.dateOfEmployment,
                phone: this.phone,
                email: this.email,
                department: this.department,
                position: this.position
            };
    
            if(this.employeeDetails) {
                updateEmployee(emp)
            } else {
                addEmployee(emp);
            }
    
            Router.go("/");
        }
    }


    render() {
        return html`
            <div class="form-container">
                <form @submit=${this.handleSubmit}>
                    <div class="grid">
                        <label>${t('firstName')}:
                            <input type="text" .value=${this.firstName} @input=${(e) => this.firstName = e.target.value} />
                            ${this.errors.firstName ? html`<div class="error">${this.errors.firstName}</div>` : ''}
                        </label>
                        <label>${t('lastName')}:
                            <input type="text" .value=${this.lastName} @input=${(e) => this.lastName = e.target.value} />
                            ${this.errors.lastName ? html`<div class="error">${this.errors.lastName}</div>` : ''}
                        </label>
                        <label>${t('dateOfEmployment')}:
                            <input type="date" .value=${this.dateOfEmployment} @input=${(e) => this.dateOfEmployment = e.target.value} />
                            ${this.errors.dateOfEmployment ? html`<div class="error">${this.errors.dateOfEmployment}</div>` : ''}
                        </label>
                        <label>${t('dateOfBirth')}:
                            <input type="date" .value=${this.dateOfBirth} @input=${(e) => this.dateOfBirth = e.target.value} />
                            ${this.errors.dateOfBirth ? html`<div class="error">${this.errors.dateOfBirth}</div>` : ''}
                        </label>
                        <label>${t('phone')}:
                            <input type="tel" .value=${this.phone} @input=${(e) => this.phone = e.target.value} />
                            ${this.errors.phone ? html`<div class="error">${this.errors.phone}</div>` : ''}
                        </label>
                        <label>${t('email')}:
                            <input type="text" .value=${this.email} @input=${(e) => this.email = e.target.value} />
                            ${this.errors.email ? html`<div class="error">${this.errors.email}</div>` : ''}
                        </label>
                        <label>${t('department')}:
                            <select .value=${this.department} @change=${(e) => this.department = e.target.value}>
                                <option value="">Please Select</option>
                                <option value="Analytics">Analytics</option>
                                <option value="Tech">Tech</option>
                            </select>
                            ${this.errors.department ? html`<div class="error">${this.errors.department}</div>` : ''}
                        </label>
                        <label>${t('position')}:
                            <select .value=${this.position} @change=${(e) => this.position = e.target.value}>
                                <option value="">Please Select</option>
                                <option value="Junior">Junior</option>
                                <option value="Medior">Medior</option>
                                <option value="Senior">Senior</option>
                            </select>
                            ${this.errors.position ? html`<div class="error">${this.errors.position}</div>` : ''}
                        </label>
                    </div>
                    <div class="buttons">
                        <button type="submit" class="save">${t('save')}</button>
                        <button type="button" class="cancel" @click=${this.handleCancel}>${t('cancel')}</button>
                    </div>
                </form>
            </div>
        `;
    }

    static styles = css`
        .form-container {
            padding: 2rem;
            background: #fff;
            border-radius: 12px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;
            font-weight: 500;
        }

        input, select {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .buttons {
            margin-top: 2rem;
            display: flex;
            justify-content: center;
            gap: 1rem;
        }

        .error {
            color: red;
            font-size: 12px;
            margin-top: 0.5rem;
        }

        .save {
            background-color: #f60;
            color: white;
            padding: 0.7rem 2rem;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
        }

        .cancel {
            background: none;
            border: 1px solid #999;
            padding: 0.7rem 2rem;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
        }
    `;


}

window.customElements.define("employee-form", EmployeeForm);