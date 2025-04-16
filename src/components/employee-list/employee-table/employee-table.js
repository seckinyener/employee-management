import { css, html, LitElement } from "lit";
import { employee$, removeEmployee } from "../../../store/employee-store";
import { Router } from "@vaadin/router";
import { t } from "../../../i18n";

export class EmployeeTable extends LitElement {

    static properties = {
        employeesInPage : {type: Array},
        showConfirmationModal: {state: true, type: Boolean},
        toBeDeletedEmployee: {type: Object}
    }

    constructor() {
        super();
        this.employeesInPage = [];
        this.toBeDeletedEmployee = {};
    }

    connectedCallback() {
        super.connectedCallback();
        this.subscription = employee$.subscribe(state => {
          const { filteredEmployees, currentPage, pageSize } = state;
          const start = (currentPage - 1) * pageSize;
          this.employeesInPage = filteredEmployees.slice(start, start + pageSize);
        });
        window.addEventListener('languageChanged', this.languageChanged);
    }
    
    languageChanged = () => {
        this.requestUpdate(); 
      }

    disconnectedCallback() {
        this.subscription.unsubscribe();
        window.removeEventListener('languageChanged', this.languageChanged);
    }

    editHandler = (id) => {
        Router.go(`/update/${id}`)
    }

    deleteEmployee = (employee) => {
        this.toBeDeletedEmployee = employee;
        this.showConfirmationModal = true;
    }

    deleteProceedHandler = () => {
        removeEmployee(this.toBeDeletedEmployee.id);
        this.showConfirmationModal = false;
        this.toBeDeletedEmployee = {};
    }

    deleteCancelHandler = () => {
        this.showConfirmationModal = false;
        this.toBeDeletedEmployee = {};
    }

    render() {
        return html`
        <table class="employee-table">
            <thead>
            <tr>
                <th>${t('firstName')}</th>
                <th>${t('lastName')}</th>
                <th>${t('dateOfEmployment')}</th>
                <th>${t('dateOfBirth')}</th>
                <th>${t('phone')}</th>
                <th>${t('email')}</th>
                <th>${t('department')}</th>
                <th>${t('position')}</th>
                <th>${t('actions')}</th>
            </tr>
            </thead>
            <tbody>
            ${this.employeesInPage.map(emp => html`
                <tr>
                <td><strong>${emp.firstName}</strong></td>
                <td><strong>${emp.lastName}</strong></td>
                <td>${emp.dateOfEmployment}</td>
                <td>${emp.dateOfBirth}</td>
                <td>${emp.phone}</td>
                <td>${emp.email}</td>
                <td>${emp.department}</td>
                <td>${emp.position}</td>
                <td>
                    <div class="action-buttons">
                        <span class="material-icons" @click=${() => this.editHandler(emp.id)}>edit</span>
                        <span class="material-icons" @click=${() => this.deleteEmployee(emp)}>delete</span>
                    </div>

                </td>
                </tr>
            `)}
            </tbody>
        </table>

        <custom-pagination></custom-pagination>

        <confirmation-modal 
            .employeeName=${this.toBeDeletedEmployee.firstName + " " + this.toBeDeletedEmployee.lastName}
            .isOpen=${this.showConfirmationModal}
            .employeeId=${this.toBeDeletedEmployee.id}
            @proceed=${this.deleteProceedHandler}
            @cancel=${this.deleteCancelHandler}
            >
        </confirmation-modal>
        `
    }

    static styles = css`
        .employee-table {
            width: 100%;
            background-color: white;
            border-collapse: collapse
        }

        thead {
            background-color: #f5f5f5;
        }

        th, td {
            padding: 12px 16px;
            text-align: left; /* tüm hücreleri sola hizalar, istersen center veya right yapabilirsin */
            vertical-align: middle;
        }

        tr {
            border-bottom: 1px solid #e0e0e0; /* her satırın altına çizgi */
        }

        th {
            color: #ff6600;
            font-weight: 600;
            font-size: 14px;
        }

        td {
            font-size: 14px;
            color: #333;
        }

        .material-icons {
            font-family: 'Material Icons';
            font-size: 24px;
            vertical-align: middle;
            cursor: pointer;
        }

        .action-buttons {
            display: flex;
            flex-direction: row;
            gap: 1rem;
            color: #ff6600;
        }
    `
}

window.customElements.define("employee-table", EmployeeTable);