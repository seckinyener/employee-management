import { css, html, LitElement } from "lit";
import { Router } from "@vaadin/router";
import { addEmployee, updateEmployee, getAllEmployees } from "../../store/employee-store";
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
        errors: { state: true, type: Object},
        isUserAlreadyExist: { state: true, type: Boolean}
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
        this.isUserAlreadyExist = false;
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
        window.addEventListener('languageChanged', this.languageChanged);
    }

    disconnectedCallback() {
        window.removeEventListener('languageChanged', this.languageChanged);
    }

    languageChanged = () => {
        this.requestUpdate(); 
    }

    validateFirstName = (errors) => {
        if(!this.firstName) {
            errors['firstName'] = 'required';
        }
    }

    validateLastName = (errors) => {
        if(!this.lastName) {
            errors['lastName'] = 'required';
        }
    }

    validateDateOfBirth = (errors) => {
        if (!this.dateOfBirth) {
            errors['dateOfBirth'] = "required";
        } else if (this.dateOfEmployment && new Date(this.dateOfBirth) >= new Date(this.dateOfEmployment)) {
            errors['dateOfBirth'] = "invalidDateOfBirth";
        }
    }

    validateDateOfEmployment = (errors) => {
        if (!this.dateOfEmployment) {
            errors['dateOfEmployment']= "required";
        } 
    }

    validatePhone = (errors) => {
        if(!this.phone) {
            errors['phone'] = "required";
        } else if(!/^(\+\d{1,2}\s?)?(\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{4})$/.test(this.phone)) {
            errors['phone'] = "invalidPhone";
        }
    }

    validateEmail = (errors) => {
        if(!this.email) {
            errors['email'] = "required";
        } else if(!/\S+@\S+\.\S+/.test(this.email)) {
            errors['email'] = "invalidEmail";
        }
    }

    validateDepartment = (errors) => {
        if (!this.department) {
            errors['department'] = "required";
        }
    }

    validatePosition = (errors) => {
        if(!this.position) {
            errors['position'] = "required"
        }
    }

    validateIfUserExist = () => {
        const employeesFromState = getAllEmployees();
        let employeeRecords = [];
        if(this.employeeDetails) {
            employeeRecords = employeesFromState.filter(item => item.id !== this.employeeDetails.id);
        }

        const found = employeeRecords.find((item) => {
            return item.firstName === this.firstName && item.lastName === this.lastName && item.dateOfBirth === this.dateOfBirth;
        });
        console.log('found user -> ', found);
        this.isUserAlreadyExist = found != null;
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
        this.validateIfUserExist();
        this.errors = errors;
        return Object.keys(this.errors).length === 0 && !this.isUserAlreadyExist;
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
                ${this.employeeDetails ? html`<div><strong>You are editing ${this.employeeDetails.firstName} ${this.employeeDetails.lastName}</strong>` : ''}
                <form @submit=${this.handleSubmit}>
                    <div class="grid">
                        <label>${t('firstName')}:
                            <input type="text" .value=${this.firstName} @input=${(e) => this.firstName = e.target.value.trim()} />
                            ${this.errors.firstName ? html`<div class="error">${t(this.errors.firstName)}</div>` : ''}
                        </label>
                        <label>${t('lastName')}:
                            <input type="text" .value=${this.lastName} @input=${(e) => this.lastName = e.target.value.trim()} />
                            ${this.errors.lastName ? html`<div class="error">${t(this.errors.lastName)}</div>` : ''}
                        </label>
                        <label>${t('dateOfEmployment')}:
                            <input type="date" .value=${this.dateOfEmployment} @input=${(e) => this.dateOfEmployment = e.target.value.trim()} />
                            ${this.errors.dateOfEmployment ? html`<div class="error">${t(this.errors.dateOfEmployment)}</div>` : ''}
                        </label>
                        <label>${t('dateOfBirth')}:
                            <input type="date" .value=${this.dateOfBirth} @input=${(e) => this.dateOfBirth = e.target.value} />
                            ${this.errors.dateOfBirth ? html`<div class="error">${t(this.errors.dateOfBirth)}</div>` : ''}
                        </label>
                        <label>${t('phone')}:
                            <input type="tel" .value=${this.phone} @input=${(e) => this.phone = e.target.value.trim()} />
                            ${this.errors.phone ? html`<div class="error">${t(this.errors.phone)}</div>` : ''}
                        </label>
                        <label>${t('email')}:
                            <input type="text" .value=${this.email} @input=${(e) => this.email = e.target.value.trim()} />
                            ${this.errors.email ? html`<div class="error">${t(this.errors.email)}</div>` : ''}
                        </label>
                        <label>${t('department')}:
                            <select .value=${this.department} @change=${(e) => this.department = e.target.value}>
                                <option value="">Please Select</option>
                                <option value="Analytics">Analytics</option>
                                <option value="Tech">Tech</option>
                            </select>
                            ${this.errors.department ? html`<div class="error">${t(this.errors.department)}</div>` : ''}
                        </label>
                        <label>${t('position')}:
                            <select .value=${this.position} @change=${(e) => this.position = e.target.value}>
                                <option value="">Please Select</option>
                                <option value="Junior">Junior</option>
                                <option value="Medior">Medior</option>
                                <option value="Senior">Senior</option>
                            </select>
                            ${this.errors.position ? html`<div class="error">${t(this.errors.position)}</div>` : ''}
                        </label>
                    </div>
                    <div class="buttons">
                        <button type="submit" class="save">${t('save')}</button>
                        <button type="button" class="cancel" @click=${this.handleCancel}>${t('cancel')}</button>
                    </div>
                    ${this.isUserAlreadyExist ? html`<div class="error user-already-exist">${t('userAlreadyExist')}</div>` : ``}
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
            gap: 3rem 6rem;
            padding: 1rem;
        }

        label {
            display: flex;
            flex-direction: column;
            font-weight: 500;
            gap: .5rem;
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
        }

        .user-already-exist {
            text-align: center;
            margin-top: 1rem;
        }

        .save {
            background-color: var(--color-orange);
            color: white;
            padding: 0.7rem 2rem;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            cursor: pointer;
            width: 20%
        }

        .save:hover {
            background-color: var(--color-orange-dark);
        }

        .cancel {
            background: none;
            border: 1px solid #5c4efc !important;
            padding: 0.7rem 2rem;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            width: 20%;
            background-color: white;
            color: #5c4efc
        }

        .cancel:hover {
            background-color: #5c4efc;
            color: white;
        }

        @media (max-width: 1024px) {
            .grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 2rem 3rem;
            }
        }

        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
                gap: 1rem;
            }

            .save, .cancel {
                width: 100%;
            }
                
            .buttons {
                flex-direction: column;
                align-items: stretch;
            }

            .form-container {
                margin-bottom: 10px
            }
        }       
    `;


}

window.customElements.define("employee-form", EmployeeForm);