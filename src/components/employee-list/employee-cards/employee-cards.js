import { css, html, LitElement } from "lit";
import { employee$ } from "../../../store/employee-store";

export class EmployeeCards extends LitElement {

    static properties = {
        employees: {state: true}
    }

    constructor() {
        super();
        this.employees = [];
    }

    /*connectedCallback() {
        super.connectedCallback();
        this.subscription = employee$.subscribe(state => {
          const { filteredEmployees, currentPage, pageSize } = state;
          const start = (currentPage - 1) * pageSize;
          this.employeesInPage = filteredEmployees.slice(start, start + pageSize);
        });
    }*/

    connectedCallback() {
        super.connectedCallback();
        this.subscription = employee$.subscribe(state => {
            const { filteredEmployees, currentPage, pageSize } = state;
            const start = (currentPage - 1) * pageSize;
            this.employees = filteredEmployees.slice(start, start + pageSize);
        });
    }

    render() {
        return html`
        <div class="grid">
            ${this.employees.map(
                emp => html`<employee-card-item .employee=${emp}></employee-card-item>`
            )}
        </div>
        <custom-pagination></custom-pagination>
        `
    }

    static styles = css`

    .grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    @media (max-width: 600px) {
        .grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }

  `;
}

window.customElements.define("employee-cards", EmployeeCards);