import { css, html, LitElement } from "lit";
import { employee$ } from "../../../store/employee-store";

export class EmployeeTable extends LitElement {

    static properties = {
        employeesInPage : {type: Array}
    }

    constructor() {
        super();
        this.employeesInPage = [];
    }

    connectedCallback() {
        super.connectedCallback();
        this.subscription = employee$.subscribe(state => {
          const { filteredEmployees, currentPage, pageSize } = state;
          const start = (currentPage - 1) * pageSize;
          this.employeesInPage = filteredEmployees.slice(start, start + pageSize);
        });
    }

    disconnectedCallback() {
        this.subscription.unsubscribe();
    }

    render() {
        return html`
        <table class="employee-table">
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Date of Employment</th>
                <th>Date of Birth</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Department</th>
                <th>Position</th>
                <th>Actions</th>
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
                        <span class="material-icons">edit</span>
                        <span class="material-icons">delete</span>
                    </div>

                </td>
                </tr>
            `)}
            </tbody>
        </table>

        <custom-pagination></custom-pagination>
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