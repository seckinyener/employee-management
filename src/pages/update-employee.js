import { css, html, LitElement } from "lit";
import { employee$ } from "../store/employee-store";
import router from '../router.js';

export class UpdateEmployee extends LitElement {

    static properties = {
        _employeeDetails: {state: true}
    }

    connectedCallback() {
        super.connectedCallback();
        const employeeId = Number(router.location.params.id);
        employee$.subscribe((data) => {
            console.log('employees -> ', data);
            this._employeeDetails = this.findEmployeeById(data, employeeId);
            console.log('this.employeeDetail -> ', this._employeeDetails);
        })
    }

    findEmployeeById = (employeeList, id) => {
        return employeeList.find(item => item.id === id);
    }

    render() {
        return html`
        <div class="edit-employee-container">
            <h2 class="edit-employee-label">Edit Employee</h2>
            <employee-form .employeeDetails=${this._employeeDetails}></employee-form>
        </div>     
        `
    }

    static styles = css`
        .edit-employee-label {
            color: #ff7e00;
        }
    `
}

customElements.define('update-employee', UpdateEmployee);