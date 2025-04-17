import { css, html, LitElement } from "lit";
import { employee$, removeEmployee } from "../../../store/employee-store";
import { Router } from "@vaadin/router";
import { t } from "../../../i18n";
import { materialIconStyles } from "../../../style/common";

export class EmployeeTable extends LitElement {

    static properties = {
        employeesInPage : {type: Array},
        showConfirmationModal: {state: true, type: Boolean},
        toBeDeletedEmployee: {type: Object},
        actionType: {state: true, type: String}
    }

    constructor() {
        super();
        this.employeesInPage = [];
        this.toBeDeletedEmployee = {};
        this.actionType = 'delete';
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

    editHandler = (employee) => {
        this.toBeDeletedEmployee = employee;
        this.actionType = 'edit'
        this.showConfirmationModal = true;
    }

    deleteHandler = (employee) => {
        this.toBeDeletedEmployee = employee;
        this.showConfirmationModal = true;
        this.actionType = 'delete';
    }

    deleteProceedHandler = () => {
        removeEmployee(this.toBeDeletedEmployee.id);
        this.showConfirmationModal = false;
        this.toBeDeletedEmployee = {};
    }

    confirmationCancelHandler = () => {
        this.showConfirmationModal = false;
        this.toBeDeletedEmployee = {};
    }

    editProceedHandler = () => {
        Router.go(`/update/${this.toBeDeletedEmployee.id}`);
        this.toBeDeletedEmployee = {};
    }

    confirmationProceedHandler = () => {
        if(this.actionType === 'delete') {
            this.deleteProceedHandler();
        } else {
            this.editProceedHandler();
        }
    }

    render() {
        return html`
        <div class="table-container">
                    <table class="employee-table">
            <colgroup>
                <col style="width: 120px" />
                <col style="width: 120px" />
                <col style="width: 140px" />
                <col style="width: 140px" />
                <col style="width: 140px" />
                <col style="width: 200px" />
                <col style="width: 120px" />
                <col style="width: 120px" />
                <col style="width: 100px" />
            </colgroup>
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
                <td>${t(emp.department)}</td>
                <td>${t(emp.position)}</td>
                <td>
                    <div class="action-buttons">
                        <span class="material-icons" @click=${() => this.editHandler(emp)}>edit</span>
                        <span class="material-icons" @click=${() => this.deleteHandler(emp)}>delete</span>
                    </div>

                </td>
                </tr>
            `)}
            </tbody>
        </table>
        </div>

        <custom-pagination></custom-pagination>

        <confirmation-modal 
            .employeeName=${this.toBeDeletedEmployee.firstName + " " + this.toBeDeletedEmployee.lastName}
            .isOpen=${this.showConfirmationModal}
            .employeeId=${this.toBeDeletedEmployee.id}
            .mode=${this.actionType}
            @proceed=${this.confirmationProceedHandler}
            @cancel=${this.confirmationCancelHandler}
            >
        </confirmation-modal>
        `
    }

    static styles = [
        materialIconStyles,
        css`

            .table-container {
                overflow-x: auto;
                max-width: 100%;
            }
                
            .employee-table {
                width: 100%;
                background-color: white;
                border-collapse: collapse;
                overflow-x: auto;
                min-width: 800px;
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
                color: var(--color-orange);
                font-weight: 600;
                font-size: 14px;
            }

            td {
                font-size: 14px;
                color: #333;
            }

            .action-buttons {
                display: flex;
                flex-direction: row;
                gap: 1rem;
                color: var(--color-orange);
            }

            @media (max-width: 600px) {
                th, td {
                    font-size: 12px;
                    padding: 8px 12px;
                }

                .action-buttons {
                    gap: 0.5rem;
                }

                .material-icons {
                    font-size: 18px;
                }

                .employee-table {
                    width: 100%;
                    min-width: 800px;
                }
            }
        `
    ]
}

window.customElements.define("employee-table", EmployeeTable);