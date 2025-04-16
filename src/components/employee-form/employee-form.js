import { css, html, LitElement } from "lit";
import { Router } from "@vaadin/router";
import { addEmployee, updateEmployee } from "../../store/employee-store";

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
        position: {state: true, type: String}
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

        console.log('employee details -> ', this.employeeDetails);
    }

    handleCancel = () => {
        Router.go("/");
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
            // call update
            updateEmployee(emp)
        } else {
            // call add
            addEmployee(emp);
        }

        Router.go("/");

    }


    render() {
        return html`
            <div class="form-container">
                <form @submit=${this.handleSubmit}>
                    <div class="grid">
                        <label>First Name:
                            <input type="text" .value=${this.firstName} @input=${(e) => this.firstName = e.target.value} />
                        </label>
                        <label>Last Name:
                            <input type="text" .value=${this.lastName} @input=${(e) => this.lastName = e.target.value} />
                        </label>
                        <label>Date of Employment:
                            <input type="date" .value=${this.dateOfEmployment} @input=${(e) => this.dateOfEmployment = e.target.value} />
                        </label>
                        <label>Date of Birth:
                            <input type="date" .value=${this.dateOfBirth} @input=${(e) => this.dateOfBirth = e.target.value} />
                        </label>
                        <label>Phone:
                            <input type="tel" .value=${this.phone} @input=${(e) => this.phone = e.target.value} />
                        </label>
                        <label>Email:
                            <input type="email" .value=${this.email} @input=${(e) => this.email = e.target.value} />
                        </label>
                        <label>Department:
                            <select .value=${this.department} @change=${(e) => this.department = e.target.value}>
                                <option value="">Please Select</option>
                                <option value="Analytics">Analytics</option>
                                <option value="Tech">Tech</option>
                            </select>
                        </label>
                        <label>Position:
                            <select .value=${this.position} @change=${(e) => this.position = e.target.value}>
                                <option value="">Please Select</option>
                                <option value="Junior">Junior</option>
                                <option value="Medior">Medior</option>
                                <option value="Senior">Senior</option>
                            </select>
                        </label>
                    </div>
                    <div class="buttons">
                        <button type="submit" class="save">Save</button>
                        <button type="button" class="cancel" @click=${this.handleCancel}>Cancel</button>
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