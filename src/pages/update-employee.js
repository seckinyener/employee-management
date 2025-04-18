import { css, html, LitElement } from "lit";
import { employee$ } from "../store/employee-store";
import router from '../router.js';
import { t } from "../i18n.js";

export class UpdateEmployee extends LitElement {

    static properties = {
        _employeeDetails: {state: true}
    }

    connectedCallback() {
        super.connectedCallback();
        const employeeId = Number(router.location.params.id);
        employee$.subscribe((data) => {
            this._employeeDetails = this.findEmployeeById(data.employees, employeeId);
        })
        window.addEventListener('languageChanged', this.languageChanged);
    }

    disconnectedCallback() {
        window.removeEventListener('languageChanged', this.languageChanged);
    }

    languageChanged = () => {
        this.requestUpdate(); 
    }

    findEmployeeById = (employeeList, id) => {
        return employeeList.find(item => item.id === id);
    }

    render() {
        return html`
        <div class="edit-employee-container">
            <h2 class="edit-employee-label">${t('editEmployee')}</h2>
            <div class="employee-form">
                <employee-form .employeeDetails=${this._employeeDetails}></employee-form>
            </div>
        </div>     
        `
    }

    static styles = css`
        .edit-employee-label {
            color: var(--color-orange);
        }

        @media (max-width: 768px) {
            .employee-form {
                padding-bottom: 1rem;
            }
        }
    `
}

customElements.define('update-employee', UpdateEmployee);